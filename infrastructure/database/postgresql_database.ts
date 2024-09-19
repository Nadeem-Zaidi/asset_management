import { Pool } from "pg";

import { Database } from "./database";
import { appConfig } from "../../appconfig";

export class PostgresDatabase implements Database {
  private pool: Pool;
  constructor() {
    this.pool = new Pool({
      host: appConfig.databaseConfig.host,
      port: appConfig.databaseConfig.port,
      user: appConfig.databaseConfig.user,
      password: appConfig.databaseConfig.password,
      database: appConfig.databaseConfig.database,
    });
  }
  async connect(): Promise<void> {
    await this.pool.connect();
    console.log("Connected to PostgreSQL");
  }
  async disconnect(): Promise<void> {
    await this.pool.end();
    console.log("Disconnected from PostgreSQL");
  }
  async query(sql: string, params?: any[]): Promise<any> {
    const result = await this.pool.query(sql, params);
    return result;
  }
}
