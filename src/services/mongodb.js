import { MongoClient } from "mongodb";

let client = null;

export async function connectMongoClient() {
  await MongoClient.connect(process.env.MONGODB_URI)
    .then((c) => {
      client = c;

      process.on("SIGINT", () => {
        if (client != null) {
          client.close();
          client = null;
        }
        process.exit(0);
      });
    })
    .catch((err) => {
      console.log("Could not connect to the database", err);
      process.exit(1);
    });
}

export async function getDatabase() {
  if (client == null) {
    await connectMongoClient();
  }
  return client.db("steamrec");
}
