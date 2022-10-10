const request = require('supertest');

const { createApp } = require('../app');
const { appData } = require('../middlewares/dataSource');
const { inputNotice, testCompany, errorNotice } = require('./data/notice');

describe('CREATE_NOTICE', () => {
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
  });

  afterAll(async () => {
    await appData.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await appData.query(`DELETE FROM notice;`);
    await appData.query(`DELETE FROM company;`);
    await appData.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    await appData.destroy();
  });

  test('FAIL: Invalid_Input ERROR', async () => {
    await request(app)
      .post('/notice')
      .send()
      .expect({ message: 'INVALID_INPUT', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('FAIL: INVALID_COMPANYID ERROR', async () => {
    await request(app)
      .post('/notice')
      .send(errorNotice)
      .expect({ message: 'INVALID_COMPANYID', code: 'NOT_FOUND' })
      .expect(404);
  });

  test('SUCCESS: Created Notice', async () => {
    await request(app).post('/notice').send(inputNotice).expect(201);
  });
});
