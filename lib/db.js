const redis = require("redis");

class Db {
  static get TTL() {
    return {
      client: 10
    };
  }

  constructor(redisUri) {
    this.redis = redis.createClient(redisUri);
  }

  addClient(id) {
    this.redis.set(`clients:${id}`, 1, "EX", Db.TTL.client);
  }

  numActiveClients() {
    const redis = this.redis;

    return new Promise((resolve, reject) => {
      redis.keys("clients:*", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length);
        }
      });
    });
  }
}

exports.createDb = redisUri => {
  return new Db(redisUri);
};
