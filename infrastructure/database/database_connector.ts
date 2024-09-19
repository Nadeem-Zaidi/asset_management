// database-connector.ts

import { appConfig } from "../../appconfig";
import { Database } from "./database";
import { PostgresDatabase } from "./postgresql_database";

let dbInstance: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (dbInstance) return dbInstance;

  dbInstance = new PostgresDatabase();
  await dbInstance.connect();
  return dbInstance;
}

export function getDatabaseInstance(): Database {
  if (!dbInstance) {
    throw new Error(
      "Database instance is not initialized. Please initialize the database first."
    );
  }
  return dbInstance;
}
