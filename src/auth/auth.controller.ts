import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn(@Body() signInDto: Record<string,any>) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
    
    @Get('env')
    env() {
        return process.env.SECRET
    }
}
