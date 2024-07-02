import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REPOSITORY } from 'src/constants';

type generateTokenType = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class TokenService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async generate(
    userId: number | string,
    username: string,
  ): Promise<generateTokenType> {
    return {
      accessToken: await this.accessToken(userId, username),
      refreshToken: await this.refreshToken(userId, username),
    };
  }

  async update(userId: number | string, userEmail: string) {
    const tokens = await this.generate(userId, userEmail);

    return tokens;
  }

  async accessToken(
    userId: number | string,
    username: string,
  ): Promise<string> {
    return this.jwtService.sign(
      {
        sub: userId,
        username,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: REPOSITORY.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    );
  }

  async refreshToken(
    userId: number | string,
    username: string,
  ): Promise<string> {
    return this.jwtService.sign(
      {
        sub: userId,
        username,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: REPOSITORY.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      },
    );
  }
}
