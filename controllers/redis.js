// const Redis = require("ioredis");

// const redis = Redis.createClient({
//   port: process.env.REDIS_PORT, // save in env 6379
//   host: "127.0.0.1",
//   no_ready_check: true,
//   //  authentication password required to connect to a Redis server that has password authentication
//   // explain Later

//   //   auth_pass: 'Q+Aa/sEmu39maIa5nw5tG/dg3gi8qfp75dmUTsrR/o69GryVdBFW14g00+wrUsQlsdQDkKqzgZ9GoWsJ',
// });

// exports.saveConfiguration = async (req, res) => {
//   try {
//     // Save Data to Redis

//     // 'mykey is the just a name to save data in Redis it can be anything disha also'

//     redis.set("name", req.body);
//     res.json({ message: "Data saved to Redis" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.getConfiguration = async (req, res) => {
//   try {
//     // Retrieve Data to Redis

//     // As mention mykey is name to set data , by passing the same key you can get the data which you set earlier =

//     redis.get("name", (err, result) => {
//       if (err) {
//         console.error(err);
//       } else {
//         res.json(JSON.parse(result)); // Output: 'Hello Redis!'
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
