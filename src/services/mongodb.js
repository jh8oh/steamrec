import { MongoClient } from "mongodb";

let db = null;

export async function connectMongoClient() {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client.db("steamrec");
    })
    .catch((err) => {
      console.log("Could not connect to the database", err);
      process.exit();
    });
}

export async function getDatabase() {
  if (db == null) {
    await connectMongoClient()
  }
  return db;
}
