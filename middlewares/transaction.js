const { appData } = require('./dataSource');

module.exports = (func, db = true) => {
  return async (req, res, next) => {
    try {
      if (db) {
        req.db = appData.createQueryRunner();
        await req.db.connect();
        await req.db.startTransaction();
      }
      await func(req, res, next);
      if (db) await req.db.commitTransaction();
      if (db) await req.db.release();
      return next();
    } catch (err) {
      if (db) await req.db.rollbackTransaction();
      if (db) await req.db.release();
      return next(err);
    }
  };
};
