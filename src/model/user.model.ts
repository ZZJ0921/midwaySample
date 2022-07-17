import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    const _user = new UserEntity();
    _user.username = username;
    _user.password = password;
    return await this.userRepo.findOneBy(_user);
  }

  async createUser(username: string, password: string): Promise<UserEntity> {
    const _user = new UserEntity();
    _user.username = username;
    _user.password = password;
    return await this.userRepo.save(_user);
  }
}
