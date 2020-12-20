import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common.module';
import { MulterModule } from '@nestjs/platform-express';
import * as MAO from 'multer-aliyun-oss';

@Module({
  imports: [
    CommonModule,
    // MulterModule.registerAsync({
    //   useFactory() {
    //     return {
    //       storage: MAO({
    //         config: {
    //           region: process.env.OSS_REGION,
    //           accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    //           accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    //           bucket: process.env.OSS_BUCKET,
    //         },
    //       }),
    //     };
    //   },
    // }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
