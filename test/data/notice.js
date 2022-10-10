const inputNotice = {
  companyId: '735e253f-b01e-4f30-a863-38dcfd777549',
  position: 'testPistion',
  reward: 10000,
  content: 'testContent',
  skill: 'testSkill',
};

const errorNotice = {
  companyId: '735e253f-b01e-4f30-a863-38dcfd777540',
  position: 'testPistion',
  reward: 10000,
  content: 'testContent',
  skill: 'testSkill',
};

const updateNotice = {
  position: 'updatePistion',
  reward: 10000,
  content: 'updateContent',
  skill: 'testSkill',
};

const testCompany = [
  [
    '735e253f-b01e-4f30-a863-38dcfd777549',
    'testFirstCompany',
    'testFirstCountry',
    'testFirstRegion',
  ],
  [
    'b5993837-f825-4ade-a54f-0048eb0279bd',
    'testSecondCompany',
    'testSecondCountry',
    'testSecondRegion',
  ],
];

const initiaNotice = [
  [
    'c2c61451-4de9-4b54-bdbd-9f16266dd39c',
    '735e253f-b01e-4f30-a863-38dcfd777549',
    'testFirstPistion',
    10000,
    'testFirstContent',
    'testFirstSkill',
  ],
  [
    '222ece4f-e33b-4de8-98f8-7d3e6b08214e',
    '735e253f-b01e-4f30-a863-38dcfd777549',
    'testSecondPistion',
    10000,
    'testSecondContent',
    'testSecondSkill',
  ],
];

const testUser = 'ca5510f9-b880-4911-945c-56d38be4680c';

const testApply = {
  userId: 'ca5510f9-b880-4911-945c-56d38be4680c',
  noticeId: '222ece4f-e33b-4de8-98f8-7d3e6b08214e',
};

const errorNoticeApply = {
  userId: 'ca5510f9-b880-4911-945c-56d38be4680c',
  noticeId: '222ece4f-e33b-4de8-98f8-7d3e6b082141',
};

const errorUserApply = {
  userId: 'ca5510f9-b880-4911-945c-56d38be46803',
  noticeId: '222ece4f-e33b-4de8-98f8-7d3e6b08214e',
};

module.exports = {
  inputNotice,
  testCompany,
  initiaNotice,
  errorNotice,
  updateNotice,
  testUser,
  testApply,
  errorNoticeApply,
  errorUserApply,
};
