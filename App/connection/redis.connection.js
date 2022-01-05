const redis = require("redis");

let client;
class Redis {
  constructor() {
    this.connect();
  }

  connect = () => {
    client = redis.createClient(process.env.REDISPORT, "127.0.0.1");
    client.connect();
    client.on("connect", function () {
      console.log("Redis server connected sucessfully!");
    });
  };

  fetchData = (key) => {
    client.get(key + "fetchRedisById")
      .then(data => {
        return JSON.parse(data);
      }).catch(error => {
        console.log("Error while finding Data", error);
      })
  };
};

setData = (key, time, data) => {
  client.setEx(key, time, data);
};

clearCache = (key) => {
  client.del(key)
    .then(data => {
      return true;
    }).catch(err => {
      return false;
    })
}

module.exports = new Redis()