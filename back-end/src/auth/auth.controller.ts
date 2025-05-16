import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Request, Response } from 'express'
import { RegisterDto } from './dto/register.dto'
import { JwtAuthGuard } from './guards/jwt.guard'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }


  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens
    (@Req() req: Request,
      @Res({ passthrough: true }) res: Response
    ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)
    return true
  }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Этот эндпоинт инициирует Google OAuth
  }

  // auth/auth.controller.ts
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as any
    const { refreshToken, accessToken } = this.authService.generateTokens(user.id) // Используем публичный метод
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    res.redirect(`http://localhost:3000/auth/callback?accessToken=${accessToken}`)
  }

  @Post('2fa/generate')
  async generate2FA(@Body('email') email: string) {
    const { secret, otpauthUrl } = this.authService.generate2FASecret(email)
    const qrCode = await this.authService.generateQRCode(otpauthUrl)

    return { secret, qrCode }
  }

  @Post('2fa/verify')
  async verify2FA(@Body() body: { userId: string; secret: string; token: string }) {
    return this.authService.verify2FA(body.userId, body.secret, body.token)
  }

  @Post('2fa/verify-remove')
  @UseGuards(JwtAuthGuard) // Add authentication guard
  async verifyRemove2FA(
    @Body() body: { userId: string; token: string },
    @Res() res: Response
  ) {
    const result = await this.authService.verifyRemove2FA(body.userId, body.token)
    return res.json(result)
  }

}
