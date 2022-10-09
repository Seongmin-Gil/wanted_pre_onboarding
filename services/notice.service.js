const { appData } = require('../middlewares/dataSource');
const { v4: uuid } = require('uuid');

const insertNotice = async ({ companyId, position, reward, content, skill }) => {
  const noticeId = uuid();
  await appData
    .createQueryBuilder()
    .insert()
    .into('notice')
    .values([{ noticeId, companyId, position, reward, content, skill }])
    .execute();
};

module.exports = {
  insertNotice,
};
