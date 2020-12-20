import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
