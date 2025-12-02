import "dotenv/config";
import { reset } from "drizzle-seed";
import * as schema from "src/database/schema";
import db, { client } from "@/database";

export async function clearDatabase() {
  console.log("🗑️ Clearing database...");
  await reset(db, schema);
}

(async () => {
  await clearDatabase();
  await client.end();
})();
