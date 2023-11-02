import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponsePresenter } from 'src/models/presenters/token-response.presenter';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(): Promise<TokenResponsePresenter> {
    const accessToken = await this.createAccessToken();
    const refreshToken = await this.createRefreshToken();
    const tokenResponse = new TokenResponsePresenter({
      accessToken,
      refreshToken,
    });

    return tokenResponse;
  }

  async refresh(): Promise<TokenResponsePresenter> {
    const accessToken = await this.createAccessToken();
    const refreshToken = await this.createRefreshToken();
    const tokenResponse = new TokenResponsePresenter({
      accessToken,
      refreshToken,
    });

    return tokenResponse;
  }

  private async createAccessToken() {
    return await this.jwtService.signAsync(
      {
        sub: 1,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_DURATION,
      },
    );
  }

  private async createRefreshToken() {
    return await this.jwtService.signAsync(
      {
        sub: 1,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_DURATION,
      },
    );
  }
}
