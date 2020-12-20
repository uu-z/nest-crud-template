import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { User, UserDocument } from '../user/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto, LoginDto } from './auto.dto';
import { CurrentUser } from './auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const user = await this.userModel.create({
      username,
      password,
    });
    return {
      user,
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      user,
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user;
  }
}
