import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { User } from './user.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User,
})
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(@InjectModel(User) private readonly model) {}
}
