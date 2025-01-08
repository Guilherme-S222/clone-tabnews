import database from "infra/database.js";

async function status(request, response) {
  // Data de atualização
  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
  });

  // Versão do PostgreSql
  const dbVersion = await database.query("SELECT version()");
  console.log(dbVersion.rows);

  // Máximo de conexões
  const maxConnections = await database.query("SHOW max_connections");
  console.log(maxConnections.rows);

  // Conexões ativas
  const usedConnections = await database.query(
    "SELECT COUNT(*) AS UsedConnections FROM pg_stat_activity",
  );
  console.log(usedConnections.rows);
}

export default status;
