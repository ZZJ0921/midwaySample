import { Inject, Controller, Post, ALL, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';
import { Validate } from '@midwayjs/validate';
import { MidwayHttpError } from '@midwayjs/core';
const jwt = require('jsonwebtoken');

@Controller('/api/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Post('/login')
  @Validate()
  async login(@Query(ALL) loginParams: UserLoginDTO) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      loginParams.username,
      loginParams.password
    );
    if (user) {
      const token = jwt.sign({ username: user.username }, 'mySecret');
      return {
        code: 200,
        result: 'success',
        message: '登录成功。',
        data: {
          token: token,
        },
      };
    } else {
      throw new MidwayHttpError('账号或密码不正确。', 400);
    }
  }
}
