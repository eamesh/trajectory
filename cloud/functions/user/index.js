// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

async function handleUpsert (data) {
  const date = new Date();
  console.log(data);
  const params = {
    ...data,
    updated_at: date
  };

  !Object.prototype.hasOwnProperty(data, 'nickName') && (
    params.created_at = date
  );

  return await db.collection('user').doc(data.openid).set({
    data: params
  });
}

async function handleGet () {
  return await db.collection('user').get();
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const data = event.data || {};
  switch (event.type) {
    case 'upsert':
      return handleUpsert({
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        ...data
      });

    default:
      return handleGet();
  }
};
