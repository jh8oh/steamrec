import { MongoClient } from "mongodb";

let client = null;

export async function connectMongoClient() {
  await MongoClient.connect(process.env.MONGODB_URI)
    .then((c) => {
      client = c;

      process.on("SIGINT", () => {
        disconnectMongoClient();
        process.exit(0);
      });
    })
    .catch((err) => {
      console.log("Could not connect to the database", err);
      process.exit(1);
    });
}

export function disconnectMongoClient() {
  if (client != null) {
    client.close();
    client = null;
  }
}

export function getDatabase() {
  return client.db("steamrec");
}
