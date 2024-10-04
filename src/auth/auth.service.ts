import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private prismaService: PrismaService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string) {
        // Validating user email against the database
        const user = await this.prismaService.user.findUnique({where: {
            email: email
        }})        
        if (!user) {
            throw new HttpException(`No user for email ${email}`, HttpStatus.NOT_FOUND)
        }
        // Validating if the user password matches the password passed in the function
        const isValidPassword = await compare(pass, user.password)
        if (!isValidPassword) {
            throw new HttpException(`Invalid Credentials`, HttpStatus.UNAUTHORIZED)
        }
        
        const payload = {sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
