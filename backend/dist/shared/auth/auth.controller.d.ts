import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getDevToken(role?: string): {
        access_token: string;
    };
}
