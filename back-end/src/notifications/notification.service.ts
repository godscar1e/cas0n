import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { NotificationDto, NotificationType } from './notification.dto'

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async findAll(userId: string): Promise<NotificationDto[]> { // Add userId parameter
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
    })

    return notifications.map(notification => ({
      type: notification.type as NotificationType,
      message: notification.message,
      userId: notification.userId,
      metadata: JSON.stringify(notification.metadata), // 👈 Приведение к строке
      createdAt: notification.createdAt,
    }))
  }

  async create(dto: NotificationDto) {
    const notification = {
      type: dto.type,
      message: dto.message,
      userId: dto.userId,
      metadata: dto.metadata,

    }

    return this.prisma.notification.create({
      data: notification,
    })
  }
}