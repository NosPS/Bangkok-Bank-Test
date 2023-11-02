import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middlewares/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/middlewares/guards/refresh_token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  signIn() {
    return this.authService.signIn();
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
