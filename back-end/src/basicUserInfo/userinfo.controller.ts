import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserInfoDto } from './userinfo.dto'
import { UserInfoService } from './userinfo.service'

@Controller('user/info') 
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) { }

  // Получение информации о пользователе по ID
  @Get(':id')
  @Auth() // Требуется авторизация
  async getUserInfo(@Param('id') id: string) {
    try {
      const userInfo = await this.userInfoService.getById(id)
      if (!userInfo) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
      return userInfo
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Failed to fetch user info', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe()) // Валидация входных данных через DTO
  async createUserInfo(@CurrentUser('id') userId: string, @Body() dto: UserInfoDto) {
    try {
      const updatedDto = { ...dto, userId } // Добавляем userId из текущего пользователя
      const newUserInfo = await this.userInfoService.create(updatedDto)
      return { message: 'User info created successfully', data: newUserInfo }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Failed to create user info', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Обработка базовой верификации
  @Post('basic-verification')
  @Auth()
  @UsePipes(new ValidationPipe())
  async basicVerification(@CurrentUser('id') id: string, @Body() formData: any) {
    try {
      const result = await this.userInfoService.basicVerification(id, formData)
      return { message: 'Basic verification completed successfully', data: result }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException('Failed to complete basic verification', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}