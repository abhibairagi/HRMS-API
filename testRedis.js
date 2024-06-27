const Redis = require("ioredis");

// Create a new Redis client
const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: "127.0.0.1",
  password: process.env.REDIS_PASSWORD, // Add this line if you have a password set
});

// Test the connection to Redis
redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

const testRedis = async () => {
  try {
    // Set a key in Redis
    await redis.set("testKey", "testValue");
    console.log("Successfully set testKey in Redis");

    // Get the key from Redis
    const value = await redis.get("testKey");
    console.log("Value for testKey:", value);
  } catch (error) {
    console.error("Error during Redis operations:", error);
  } finally {
    // Disconnect from Redis
    redis.disconnect();
  }
};

testRedis();
