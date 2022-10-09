const { insertNotice } = require("../services/notice.service");

const postNotice = async (req, res) => {
  await insertNotice(req.body);
  return res.status(201).json();
};

module.exports = {
  postNotice,
};
