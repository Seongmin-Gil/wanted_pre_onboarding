const request = require('supertest');

const { createApp } = require('../app');
const { appData } = require('../middlewares/dataSource');
const { testCompany, initiaNotice } = require('./data/notice');

describe('GET_NOTICE', () => {
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
  });

  afterAll(async () => {
    await appData.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await appData.query(`DELETE FROM notice;`);
    await appData.query(`DELETE FROM company;`);
    await appData.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    await appData.destroy();
  });

  test('SUCCESS: Get Notice List', async () => {
    await request(app).get('/notice').expect(200);
  });

  test('FAIL: INVALID_UUID ERROR', async () => {
    await request(app)
      .get('/notice/c2c61451-4de9-4b54-bdbd-9f16266dd')
      .expect({ message: 'INVALID_INPUT', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('FAIL: INVALID_NOTICEID', async () => {
    await request(app)
      .get('/notice/c2c61451-4de9-4b54-bdbd-9f16266dd391')
      .expect({ message: 'INVALID_NOTICEID', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('SUCCESS: Get Notice Detail', async () => {
    await request(app).get('/notice/c2c61451-4de9-4b54-bdbd-9f16266dd39c').expect(200);
  });

  test('SUCCESS: Get Notice Search', async () => {
    await request(app).get('/notice/search?text=test').expect(200);
  });
});
