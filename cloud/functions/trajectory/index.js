// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  return db.collection('trajectory').aggregate()
    .geoNear({
      distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
      distanceMultiplier: 6378137,
      spherical: true,
      maxDistance: (parseInt(event.range) * 1000) / 6378137,
      near: db.Geo.Point(event.longitude, event.latitude),
      limit: 500,
    })
    .limit(500)
    .end();

  // return db.collection('trajectory').where({
  //   location: db.command.geoNear({
  //     geometry: db.Geo.Point(event.longitude, event.latitude),
  //     maxDistance: 20000,
  //     distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
  //     spherical: true,
  //   })
  // }).get();
  // return {
  //   event,
  // };
};
