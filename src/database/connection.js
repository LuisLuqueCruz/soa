import sql from "mssql";

export const dbSettings = {
  user: 'root',
  password: 'XPTecsup2',
  server: '35.202.180.79',
  database: 'dbusuarios',
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
