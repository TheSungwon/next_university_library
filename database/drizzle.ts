import { neon } from "@neondatabase/serverless";
import config from "../config";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(config.env.databaseUrl!);
const db = drizzle({ client: sql });

export default db;
