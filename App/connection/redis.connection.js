/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const redis = require('redis');
const { logger } = require('../../logger/logger');

let client;
class Redis {
  constructor() {
    this.connect();
  }

  connect = () => {
    client = redis.createClient(process.env.REDISPORT, '127.0.0.1');
    client.connect();
    client.on('connect', () => {
      logger.info('Redis server connected sucessfully!');
      console.log('Redis server connected sucessfully!');
    });
  };

  fetchData = (key) => {
    client.get(`${key}fetchRedisById`)
      .then((data) => JSON.parse(data)).catch((error) => {
        logger.error('Error while finding Data', error);
      });
  };

  setData = (key, time, data) => {
    client.setEx(key, time, data);
  };

  cacheClear = (key) => {
    client.del(key)
      .then((data) => true).catch((error) => false);
  };
}
module.exports = new Redis();
