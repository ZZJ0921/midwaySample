import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658001688405_2629',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
    default: {
      username: 'jack',
      password: 'redballoon',
    },
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx',
    expiresIn: '2d',
  },
  security: {
    csrf: {
      enabled: false,
    },
    domainWhitelist: ['http://127.0.0.1:7001'],
  },
  cors: {
    credentials: false,
  },
  jsonp: {
    callback: 'jsonp',
    limit: 512,
  },
} as MidwayConfig;
