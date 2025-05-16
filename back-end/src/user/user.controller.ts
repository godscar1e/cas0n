import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'
import { UpdatePasswordDto } from './update-password.dto'


@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }
  
  @Get('id/:username')
  async getIdByUsername(@Param('username') username: string) {
    return this.userService.getIdByUsername(username)
  }


  @Patch()
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    const { ...updateData } = dto
    return this.userService.update(id, updateData)
  }

  @Get('users')
  async getAllUsersNames() {
    return this.userService.findAll()
  }

  //сделать чтобы выводились последние 12 по дате 
  @Get('/all')
  async getAllUsers(): Promise<UserDto[]> {
    try {
      const users = await this.userService.findAll()
      return users
    } catch (error) {
      console.error('Error fetching users: ', error)
      throw error
    }
  }

  @Patch(':id/password')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto
  ) {
    try {
      const updatedUser = await this.userService.updatePassword(id, dto)
      return { message: 'Password updated successfully', user: updatedUser }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Failed to update password', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Put(':id/currency')
  async updateCurrency(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UserDto
  ): Promise<UserDto[]> {
    try {
      const updatedUser = await this.userService.updateCurrency(id, updateCurrencyDto)
      return updatedUser
    } catch (error) {
      // Handle errors
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Failed to update currency',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

}

@Controller('user/verify')
export class UserVerificationController {
  constructor(private readonly userService: UserService) { }

  @Post('send')
  async sendVerificationCode(@Body('email') email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST)
    }
    return this.userService.sendVerificationEmail(email)
  }

  @Post('confirm')
  async confirmVerificationCode(@Body() { email, code }: { email: string; code: string }) {
    if (!email || !code) {
      throw new HttpException('Email and code are required', HttpStatus.BAD_REQUEST)
    }
    return this.userService.verifyEmail(email, code)
  }

  @Get('status')
  async getVerificationStatus(@Req() req) {
    const userId = req.user.id  // Получаем ID пользователя из запроса (например, из сессии)
    const user = await this.userService.getById(userId)
    return { isEmailVerified: user.isEmailVerified }
  }
}
