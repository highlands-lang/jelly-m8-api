import { drizzle } from "drizzle-orm/postgres-js";
import config from "@/lib/config/config";
import postgres from "postgres";

const connectionString = config.database.url;
export const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, {
  casing: "snake_case",
});

export default db;
