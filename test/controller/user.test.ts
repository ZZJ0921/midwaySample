import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from "@midwayjs/koa";

describe('test/controller/user.test.ts', () => {
  let app: Application;

  beforeAll( async () => {
    try {
      app = await createApp<Framework>();
    } catch(err) {
      console.error('test beforeAll error', err);
      throw err;
    }
    await createHttpRequest(app).post('/api/create_user').query({
      username: "mockUserName",
      password: "mockPassword"
    })
  })

  afterAll( async () => {
    await close(app);
  })

  it('正常登陆', async () => {
    const start = Date.now();
    const result = await createHttpRequest(app).post('/api/user/login').query({
      username: "mockUserName",
      password: "mockPassword"
    })
    const cost = Date.now() - start;

    expect(cost).toBeLessThan(1000);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe("success");
    expect(result.body.message).toBe('登录成功。');
  });

  it("异常登录", async () => {
    const start = Date.now();
    const result = await createHttpRequest(app).post('/api/user/login').query({
      username: "wrongName",
      password: "wrongPassword"
    })
    const cost = Date.now() - start;
    expect(cost).toBeLessThan(1000);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe("error");
    expect(result.body.message).toBe('账号或密码不正确。');
  })
});
