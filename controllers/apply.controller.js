const { insertApply } = require('../services/apply.service');

const postApply = async (req, res) => {
  await insertApply(req.body, req.db);
  return res.status(201).json({ message: 'COMPLETE_APPLY' });
};

module.exports = {
  postApply,
};
