import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get('info')
  info(@Response() res: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.redirect('/api/auth/profile');
  }

  @Public()
  @Post('login')
  @Redirect('/api/auth/login', 307)
  login() {
    return;
  }
}
