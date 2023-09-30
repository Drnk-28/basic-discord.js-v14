const { ClusterManager } = require("discord-hybrid-sharding");
const { config } = require("./src/settings/config");

const manager = new ClusterManager(`./src/index.js`, {
  totalShards: "auto",
  shardsPerClusters: 2,
  totalClusters: "auto",
  mode: "process", // workers , process by default
  token: config.BOT_TOKEN,
});

manager.on("clusterCreate", (cluster) => {
  console.log(`[ SHARD INFO ] Launched Cluster ${cluster.id}`)
})


manager.spawn({ timeout: -1 })

// ERROR HANDLER :)
process.on("unhandledRejection", (e) => {
  console.log("[1] [ Error Handler ]\n" + e);
});
process.on("uncaughtException", (e) => {
  console.log("[2] [ Error Handler ]\n" + e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log("[3] [ Error Handler ]\n" + e);
});
