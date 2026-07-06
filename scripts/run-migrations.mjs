import postgres from "postgres";
import { readFileSync } from "fs";

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

let hasError = false;

async function runStatements(label, statements) {
  for (const stmt of statements) {
    if (!stmt) continue;
    try {
      console.log(`${label}: ${stmt.slice(0, 120)}...`);
      await sql.unsafe(stmt);
      console.log("  OK");
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
      hasError = true;
    }
  }
}

try {
  // Schema migration
  const migration = readFileSync(
    new URL("../drizzle/0000_solid_vengeance.sql", import.meta.url),
    "utf-8"
  );
  const schemaStatements = migration.split("--> statement-breakpoint").map(s => s.trim()).filter(Boolean);
  await runStatements("Schema", schemaStatements);

  // RLS policies
  const rls = readFileSync(
    new URL("../infra/migrations/002_rls_policies.sql", import.meta.url),
    "utf-8"
  );
  const rlsStatements = rls.split(";").map(s => s.trim()).filter(Boolean);
  await runStatements("RLS", rlsStatements);

  if (hasError) {
    console.log("\nCompleted with some errors (likely already exists).");
  } else {
    console.log("\nAll migrations applied successfully!");
  }
} catch (e) {
  console.error("Fatal error:", e);
} finally {
  await sql.end();
}
