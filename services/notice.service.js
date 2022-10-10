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

  return;
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

  return;
};

const deleteNoticeInfo = async (noticeId, db) => {
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

  await db.manager.createQueryBuilder().delete().from('notice').where({ noticeId }).execute();
  return;
};

const selectnotice = async () => {
  return await appData.query(`
    SELECT 
      n.noticeId AS '채용공고_id',
      c.companyName AS '회사명',
      c.country AS '국가',
      c.region AS '지역',
      n.position AS '채용포지션',
      n.reward AS '채용보상금',
      n.skill AS '사용기술'
    FROM notice n
    INNER JOIN company c
    ON n.companyId = c.companyId
  `);
};

const selectDetailNotice = async noticeId => {
  const [selectResult] = await appData.query(
    `
  SELECT 
    n.noticeId AS '채용공고_id',
    c.companyName AS '회사명',
    c.country AS '국가',
    c.region AS '지역',
    n.position AS '채용포지션',
    n.reward AS '채용보상금',
    n.skill AS '사용기술',
    n.content AS '채용내용',
    (SELECT JSON_ARRAYAGG(noticeId) FROM notice 
      WHERE notice.companyId = c.companyId
      AND NOT notice.noticeId = n.noticeId) AS '회사가올린다른채용공고'
  FROM notice n
  INNER JOIN company c
  ON n.companyId = c.companyId
  WHERE n.noticeId = ?
  `,
    [noticeId]
  );

  if (!selectResult) throw new CustomError(404, 'INVALID_NOTICEID');

  return selectResult;
};

module.exports = {
  insertNotice,
  updateNotice,
  deleteNoticeInfo,
  selectnotice,
  selectDetailNotice,
};
