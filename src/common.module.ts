import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user/user.model';

const models = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    models,
  ],
  providers: [],
  exports: [JwtModule, models],
})
export class CommonModule {}
