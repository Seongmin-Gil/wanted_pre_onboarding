const { v4: uuid } = require('uuid');
const CustomError = require('../utils/CustomError');
const { appData } = require('../middlewares/dataSource');

const insertApply = async ({ userId, noticeId }, db) => {
  const [{ valideNotice }] = await appData.query(
    `
  SELECT EXISTS(
    SELECT 
        noticeId 
    FROM notice 
    WHERE noticeId = ?
  ) AS valideNotice
  `,
    [noticeId]
  );

  if (!valideNotice) throw new CustomError(404, 'INVALID_NOTICEID');

  const [{ valideUser }] = await appData.query(
    `
  SELECT EXISTS(
    SELECT 
        userId 
    FROM user 
    WHERE userId = ?
  ) AS valideUser
  `,
    [userId]
  );

  if (!valideUser) throw new CustomError(404, 'INVALID_USERID');

  const [{ valideApply }] = await appData.query(
    `
  SELECT EXISTS(
    SELECT 
        userId 
    FROM apply 
    WHERE userId = ?
  ) AS valideApply
  `,
    [userId]
  );

  if (valideApply) throw new CustomError(409, '사용자는 1회만 지원 가능합니다.');

  const applyId = uuid();

  await db.manager
    .createQueryBuilder()
    .insert()
    .into('apply')
    .values([{ applyId, userId, noticeId }])
    .execute();

  return;
};

module.exports = {
  insertApply,
};
