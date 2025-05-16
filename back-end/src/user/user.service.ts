import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { randomInt } from 'crypto'
import * as nodemailer from 'nodemailer'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './user.dto'
import { BalanceService } from '../balance/balance.service'
import { BalanceDto } from 'src/balance/balance.dto'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private balanceService: BalanceService
  ) { }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
    })
  }

  async getByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username
      },
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = profile

    return {
      user: rest,
    }
  }

  async getIdByUsername(username: string) {
    const userId = await this.getByUsername(username)

    const { id } = userId

    return {
      userId: id,
    }
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany()

    return users.map(user => ({
      id: user.id.toString(),
      username: user.username,
      password: user.password,
      email: user.email,
      currency: user.currency,
      role: user.role,
      isActive: user.isActive,
      referralCode: user.referralCode,
      experience: user.experience,
      isEmailVerified: user.isEmailVerified,
      isBasicVerified: user.isBasicVerified,
      twoFactorSecret: user.twoFactorSecret,
      isTwoFactorVerified: user.isTwoFactorVerified,
      verificationCode: user.verificationCode,
      createdAt: user.createdAt
    }))
  }

  async create(dto: RegisterDto) {
    const user = {
      email: dto.email,
      username: dto.username || null,
      password: await hash(dto.password),
      isActive: true,
      currency: 'USD',
      role: 'Client',
      twoFactorSecret: '',
      referralCode: dto.referralCode,
      experience: 0
    }

    const createdUser = await this.prisma.user.create({
      data: user,
    })

    // Create a BalanceDto instance to satisfy the type
    const balanceDto = new BalanceDto()
    balanceDto.userId = createdUser.id
    balanceDto.balance = 0

    // Create a balance record for the new user
    await this.balanceService.create(balanceDto)

    return createdUser
  }

  async update(id: string, updateData: Partial<UserDto>) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('User ID is required for update')
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    })
  }

  async updatePassword(id: string, passwordData: { oldPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    // Проверка старого пароля
    const isPasswordValid = await verify(user.password, passwordData.oldPassword)
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect')
    }

    // Хеширование нового пароля
    const hashedNewPassword = await hash(passwordData.newPassword)

    // Обновление пароля в базе данных
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    })

    // Удаляем пароль из ответа
    const { password, ...rest } = updatedUser

    return rest
  }

  async updateCurrency(id: string, updateCurrencyDto: UserDto): Promise<UserDto[]> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { currency: updateCurrencyDto.currency },
    })
    return [updatedUser]
  }

  async sendVerificationEmail(email: string) {
    const verificationCode = randomInt(100000, 999999).toString()

    await this.prisma.user.update({
      where: { email },
      data: { verificationCode },
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    })

    return { message: 'Verification email sent' }
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user || user.verificationCode !== code) {
      throw new Error('Invalid verification code')
    }

    // Обновляем флаг верификации
    await this.prisma.user.update({
      where: { email },
      data: { isEmailVerified: true, verificationCode: null },
    })

    return { message: 'Email verified successfully', isEmailVerified: true }
  }
}