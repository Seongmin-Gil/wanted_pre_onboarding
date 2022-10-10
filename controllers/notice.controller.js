const { insertNotice, updateNotice } = require('../services/notice.service');

const postNotice = async (req, res) => {
  await insertNotice(req.body);
  return res.status(201).json();
};

const putNotice = async (req, res) => {
  const { noticeId } = req.params;
  await updateNotice(noticeId, req.body, req.db);
  return res.status(201).json({ message: 'COMPLETE_UPDATE' });
};

module.exports = {
  postNotice,
  putNotice,
};
