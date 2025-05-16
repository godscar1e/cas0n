// src/basicUserInfo/userinfo.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service' // Убедитесь, что путь верный
import { UserInfoDto } from './userinfo.dto'

@Injectable()
export class UserInfoService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService // Внедрение UserService
  ) { }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
    })
  }

  async create(dto: UserInfoDto) {
    const info = {
      userId: dto.userId,
      country: dto.country,
      name: dto.name,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
    }

    return this.prisma.basicUserInfo.create({
      data: info,
    })
  }

  async basicVerification(id: string, formData: any) {
    console.log('Received formData:', formData)

    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')

    const { country, firstName, lastName, dateOfBirth } = formData
    if (!country || !firstName || !lastName || !dateOfBirth) {
      throw new BadRequestException('All fields are required')
    }


    const existingInfo = await this.prisma.basicUserInfo.findUnique({
      where: { userId: id },
    })
    if (existingInfo) {
      throw new BadRequestException('Basic verification already completed')
    }

    const userInfo = await this.prisma.basicUserInfo.create({
      data: {
        userId: id,
        name: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        country,
      },
    })
    console.log('Created basicUserInfo:', userInfo)

    try {
      await this.userService.update(id, { isBasicVerified: true }) // Ошибка здесь
      console.log('Updated user isBasicVerified to true for id:', id)
    } catch (updateError) {
      console.error('Error updating isBasicVerified:', updateError)
    }

    return {
      message: 'Basic verification completed successfully',
      data: userInfo,
    }
  }
}