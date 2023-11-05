import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponsePresenter } from 'src/models/presenters/token-response.presenter';
import { GetErrorMessage } from 'src/utils/get-error-message.util';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(): Promise<TokenResponsePresenter> {
    try {
      const accessToken = await this.createAccessToken();
      const refreshToken = await this.createRefreshToken();
      const tokenResponse = new TokenResponsePresenter({
        accessToken,
        refreshToken,
      });

      return tokenResponse;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
  }

  async refresh(): Promise<TokenResponsePresenter> {
    try {
      const accessToken = await this.createAccessToken();
      const refreshToken = await this.createRefreshToken();
      const tokenResponse = new TokenResponsePresenter({
        accessToken,
        refreshToken,
      });

      return tokenResponse;
    } catch (error) {
      throw new InternalServerErrorException(GetErrorMessage(error));
    }
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
