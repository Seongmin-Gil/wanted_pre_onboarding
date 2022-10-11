const request = require('supertest');

const { createApp } = require('../app');
const { appData } = require('../middlewares/dataSource');
const {
  testCompany,
  initiaNotice,
  testUser,
  testApply,
  errorNoticeApply,
  errorUserApply,
} = require('./data/notice');

describe('APPLY_TEST', () => {
  let app;
  beforeAll(async () => {
    app = createApp();
    await appData.initialize();
    await appData.query(
      `
    INSERT INTO company(
      companyId,
      companyName,
      country,
      region
    ) VALUES ?
    `,
      [testCompany]
    );

    await appData.query(
      `
    INSERT INTO notice(
      noticeId,
      companyId,
      position,
      reward,
      content,
      skill
    ) VALUES ?
    `,
      [initiaNotice]
    );

    await appData.query(
      `
    INSERT INTO user(
      userId
    ) VALUES (?)
    ;`,
      [testUser]
    );
  });

  afterAll(async () => {
    await appData.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await appData.query(`DELETE FROM apply;`);
    await appData.query(`DELETE FROM user;`);
    await appData.query(`DELETE FROM notice;`);
    await appData.query(`DELETE FROM company;`);
    await appData.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    await appData.destroy();
  });

  test('FAIL: INVALID_INPUT ERROR', async () => {
    await request(app)
      .post('/apply')
      .send()
      .expect({ message: 'INVALID_INPUT', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('FAIL: INVALID_NOTICEID ERROR', async () => {
    await request(app)
      .post('/apply')
      .send(errorNoticeApply)
      .expect({ message: 'INVALID_NOTICEID', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('FAIL: INVALID_USERID ERROR', async () => {
    await request(app)
      .post('/apply')
      .send(errorUserApply)
      .expect({ message: 'INVALID_USERID', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('SUCCESS: APPLY', async () => {
    await request(app)
      .post('/apply')
      .send(testApply)
      .expect({ message: 'COMPLETE_APPLY' })
      .expect(201);
  });
});
