import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @HttpCode(200)
    @ApiResponse({status: 200, description: `Successfully loged into the API`})
    @ApiResponse({status: 404, description: `Email is not registered. Register`})
    @ApiResponse({status: 401, description: `Invalid login credentials`})
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.email, signInDto.password)
    }
}
