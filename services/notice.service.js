const { appData } = require('../middlewares/dataSource');
const { v4: uuid } = require('uuid');
const CustomError = require('../utils/CustomError');

const insertNotice = async ({ companyId, position, reward, content, skill }) => {
  const noticeId = uuid();
  await appData
    .createQueryBuilder()
    .insert()
    .into('notice')
    .values([{ noticeId, companyId, position, reward, content, skill }])
    .execute();
};

const updateNotice = async (noticeId, { position, reward, content, skill }, db) => {
  await db.manager
    .createQueryBuilder('notice')
    .select()
    .from('notice')
    .where({ noticeId })
    .setLock('pessimistic_write');

  const [{ valideNotice }] = await appData.query(`
  SELECT EXISTS(
    SELECT 
        noticeId 
    FROM notice 
    WHERE noticeId = '${noticeId}'
  ) AS valideNotice
  `);

  if (!valideNotice) throw new CustomError(404, 'INVALID_NOTICEID');

  await db.manager
    .createQueryBuilder()
    .update('notice')
    .set({ position, reward, content, skill })
    .where({ noticeId })
    .execute();
};

module.exports = {
  insertNotice,
  updateNotice,
};
