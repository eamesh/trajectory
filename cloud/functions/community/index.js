// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('community').aggregate().match(_.or([
    {
      address: db.RegExp({
        regexp: event.keyword,
        options: 'i'
      }),
    },
    {
      area: db.RegExp({
        regexp: event.keyword,
        options: 'i'
      }),
    }
  ]))
  .limit(500)
  .sort({
    date: -1
  }).end();
};
