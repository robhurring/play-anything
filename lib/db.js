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

  setStatus(online) {
    this.redis.set("status:online", online);
  }

  getStatus() {
    return new Promise((resolve, reject) => {
      this.redis.get("status:online", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data === "true");
        }
      });
    });
  }
}

exports.createDb = redisUri => {
  return new Db(redisUri);
};
