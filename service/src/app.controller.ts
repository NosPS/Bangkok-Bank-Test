import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from './middlewares/decorators/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @Public()
  @Redirect('api')
  @ApiOperation({ summary: 'redirect to swagger page' })
  redirect() {}
}
