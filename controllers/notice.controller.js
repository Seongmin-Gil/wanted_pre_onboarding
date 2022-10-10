const { insertNotice, updateNotice, deleteNoticeInfo } = require('../services/notice.service');

const postNotice = async (req, res) => {
  await insertNotice(req.body);
  return res.status(201).json();
};

const putNotice = async (req, res) => {
  const { noticeId } = req.params;
  await updateNotice(noticeId, req.body, req.db);
  return res.status(201).json({ message: 'COMPLETE_UPDATE' });
};

const deleteNotice = async (req, res) => {
  const { noticeId } = req.params;
  await deleteNoticeInfo(noticeId, req.db);
  return res.status(200).json({ message: 'DELETED_NOTICE' });
};

module.exports = {
  postNotice,
  putNotice,
  deleteNotice,
};
