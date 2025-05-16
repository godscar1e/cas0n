import { Controller, Get, Put, Patch, HttpCode, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { BalanceDto } from './balance.dto'
import { BalanceService } from './balance.service'

@Controller('user/balance')
@UseGuards(AuthGuard('jwt'))
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) { }

  @Get()
  async balance(@CurrentUser('id') id: string) {
    return this.balanceService.getBalance(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: BalanceDto) {
    return this.balanceService.update(id, dto)
  }

  @Patch()
  async update(@CurrentUser('id') id: string, @Body() dto: BalanceDto) {
    const { ...updateData } = dto
    console.log('id:', id)
    return this.balanceService.update(id, updateData)
  }
}