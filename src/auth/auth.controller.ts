import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @HttpCode(200)
    signIn(@Body() signInDto: Record<string,any>) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
}
