import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { NotificationDto } from './notification.dto'
import { NotificationService } from './notification.service'


@Controller('user/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  async createNotification(@Body() dto: NotificationDto) {
    try {
      const createdNotification = await this.notificationService.create(dto)
      return {
        ...createdNotification,
        // createdAt: createdNotification.createdAt.toISOString(),
      }
    } catch (error) {
      console.error('Error creating notification: ', error)
      throw error
    }
  }
  @Get(':userId')
  async getAllById(@Param('userId') userId: string) {
    const notifications = await this.notificationService.findAll(userId)
    return { notifications }
  }


}
