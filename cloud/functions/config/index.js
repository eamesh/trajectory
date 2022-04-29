// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const configs = await db.collection('config').get();

  let config = {};
  configs.data.forEach(item => {
    config[item.name] = item.value;
  });

  return config;
};
