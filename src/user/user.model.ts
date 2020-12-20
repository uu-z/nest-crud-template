import { prop, modelOptions, DocumentType, index } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  },
})
@index({ username: 1 }, { unique: true })
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop({ unique: true, sparse: true })
  username: string;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
