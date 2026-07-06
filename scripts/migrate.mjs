import postgres from "postgres";
import { readFileSync } from "fs";

const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const migration = readFileSync(
  new URL("../drizzle/0000_solid_vengeance.sql", import.meta.url),
  "utf-8"
);

const statements = migration
  .split("--> statement-breakpoint")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  if (stmt) {
    console.log(`Executing: ${stmt.slice(0, 80)}...`);
    await sql.unsafe(stmt);
  }
}

console.log("Schema migration applied successfully!");

const rls = readFileSync(
  new URL("../infra/migrations/002_rls_policies.sql", import.meta.url),
  "utf-8"
);

const rlsStatements = rls
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of rlsStatements) {
  if (stmt) {
    console.log(`Executing RLS: ${stmt.slice(0, 80)}...`);
    await sql.unsafe(stmt + ";");
  }
}

console.log("RLS policies applied successfully!");
await sql.end();
