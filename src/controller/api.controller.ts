import { Inject, Controller, Query, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';
import { MidwayHttpError } from "@midwayjs/core";

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Post('/create_user')
  async createUser(@Query('username') username, @Query('password') password) {
    try {
      const user = await this.userModel.createUser(username, password);
      return {
        code: 200,
        result: 'success',
        success: true,
        message: '创建成功。',
        data: user,
      };
    } catch (error) {
      throw new MidwayHttpError('创建失败。', 400);
    }
  }
}
