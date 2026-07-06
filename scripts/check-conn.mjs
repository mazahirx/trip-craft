import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) { console.log("DATABASE_URL not set"); process.exit(1); }

// Try direct connection
try {
  const sql = postgres(url, { prepare: false, connect_timeout: 10 });
  await sql`SELECT 1 as ok`;
  console.log("DIRECT CONNECTION OK");
  await sql.end();
  process.exit(0);
} catch (e) {
  console.log("Direct connection failed:", e.message);
}

// Try with IPv6 address resolved
import { resolve6 } from "dns/promises";
try {
  const host = new URL(url).hostname;
  const addrs = await resolve6(host);
  console.log("IPv6 addresses:", addrs);
  for (const ip of addrs.slice(0, 2)) {
    try {
      const altUrl = url.replace(host, `[${ip}]`);
      console.log(`Trying ${altUrl.replace(/:.+@/, "://user:pass@")}`);
      const sql = postgres(altUrl, { prepare: false, connect_timeout: 10 });
      await sql`SELECT 1 as ok`;
      console.log("IP CONNECTION OK");
      await sql.end();
      process.exit(0);
    } catch (e2) {
      console.log(`  Failed: ${e2.message}`);
    }
  }
} catch (e) {
  console.log("DNS resolution failed:", e.message);
}

console.log("ALL CONNECTION ATTEMPTS FAILED");
process.exit(1);
