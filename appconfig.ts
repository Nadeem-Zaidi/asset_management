export interface AppConfig {
  databaseType: "postgres" | "mysql";
  databaseConfig: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

export const appConfig: AppConfig = {
  databaseType: "postgres",
  databaseConfig: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "",
    database: "yellowgrocery2",
  },
};
