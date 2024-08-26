import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private prismaService: PrismaService) {}

    async signIn(email: string, pass: string) {
        // Validating user email against the database
        const user = await this.prismaService.user.findUnique({where: {
            email: email
        }})        
        if (!user) {
            throw new NotFoundException(`No user for email ${email}`)
        }
        // Validating if the user password matches the password passed in the function
        const isValidPassword = await compare(pass, user.password)
        if (!isValidPassword) {
            throw new UnauthorizedException(`Invalid Credentials`)
        }
        // TODO: Sign a JWT token to the user instead of returning the user.
        // This is just for TESTING purposes. DO NOT keep it that way.
        const {password, ...result} = user;
        return result;
    }
}
