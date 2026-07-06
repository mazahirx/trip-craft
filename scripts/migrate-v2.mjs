import { resolve4, resolve6 } from "dns/promises";
import postgres from "postgres";
import { readFileSync } from "fs";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

const url = new URL(DB_URL);
const hostname = url.hostname;

// Try IPv6 first, then IPv4
let address;
try {
  const addrs = await resolve6(hostname, { ttl: false });
  address = addrs[0];
  console.log(`Resolved ${hostname} -> IPv6: ${address}`);
} catch {
  try {
    const addrs = await resolve4(hostname);
    address = addrs[0];
    console.log(`Resolved ${hostname} -> IPv4: ${address}`);
  } catch (e) {
    console.error(`Cannot resolve ${hostname}:`, e.message);
    process.exit(1);
  }
}

url.hostname = address;
const connString = url.toString();
console.log(`Connecting via IP: ${connString.replace(/:.+@/, "://user:pass@")}`);

const sql = postgres(connString, { prepare: false, connect_timeout: 15 });

try {
  const migration = readFileSync(
    new URL("../drizzle/0000_solid_vengeance.sql", import.meta.url),
    "utf-8"
  );
  const statements = migration.split("--> statement-breakpoint").map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    console.log(`Executing: ${stmt.slice(0, 100)}...`);
    await sql.unsafe(stmt);
  }
  console.log("Schema migration applied!");

  const rls = readFileSync(
    new URL("../infra/migrations/002_rls_policies.sql", import.meta.url),
    "utf-8"
  );
  const rlsStatements = rls.split(";").map(s => s.trim()).filter(Boolean);
  for (const stmt of rlsStatements) {
    if (stmt.toLowerCase().startsWith("alter") || stmt.toLowerCase().startsWith("create")) {
      console.log(`Executing RLS: ${stmt.slice(0, 100)}...`);
      await sql.unsafe(stmt + ";");
    }
  }
  console.log("RLS policies applied!");
} catch (e) {
  console.error("Migration failed:", e.message);
  process.exit(1);
} finally {
  await sql.end();
}
