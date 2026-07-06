import postgres from "postgres";

const urls = [
  process.env.DATABASE_URL,
  process.env.DATABASE_URL?.replace(":5432/", ":6543/") + "?pgbouncer=true",
];

for (const url of urls) {
  if (!url) continue;
  console.log(`Trying: ${url.replace(/:.+@/, "://user:pass@")}`);
  try {
    const sql = postgres(url, { prepare: false, connect_timeout: 10 });
    const result = await sql`SELECT 1 AS ok`;
    console.log("Connected!", result);
    await sql.end();
    process.exit(0);
  } catch (e) {
    console.log(`Failed: ${e.message}`);
  }
}
console.log("All connection attempts failed");
process.exit(1);
