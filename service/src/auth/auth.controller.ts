import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/middlewares/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/middlewares/guards/refresh_token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'login' })
  signIn() {
    return this.authService.signIn();
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Something went wrong.' })
  @ApiOperation({ summary: 'refresh token (use a refreshToken for authorization)' })
  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
}
