import { Pool } from 'pg';
import config from './env';

let pool: Pool | null = null;
let connected = false;

export function getDatabaseStatus() {
  return { provider: config.databaseUrl ? 'postgresql' : 'memory', connected };
}

export async function initializeDatabase() {
  if (!config.databaseUrl) return;

  pool = new Pool({ connectionString: config.databaseUrl, connectionTimeoutMillis: 5000 });
  await pool.query('SELECT 1');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      phone TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS medicines (
      id TEXT PRIMARY KEY,
      brand_name TEXT NOT NULL,
      salt_composition TEXT NOT NULL,
      category TEXT NOT NULL,
      dpco_ceiling_price NUMERIC(12, 2) NOT NULL,
      market_price NUMERIC(12, 2) NOT NULL,
      schedule_type TEXT NOT NULL,
      manufacturer TEXT NOT NULL,
      generic_price NUMERIC(12, 2) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pharmacies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      locality TEXT NOT NULL,
      pincode TEXT NOT NULL,
      license_number TEXT NOT NULL,
      approved BOOLEAN NOT NULL DEFAULT FALSE,
      owner_id UUID
    );
    CREATE TABLE IF NOT EXISTS reservations (
      id UUID PRIMARY KEY,
      hold_code TEXT UNIQUE NOT NULL,
      patient_id UUID NOT NULL,
      pharmacy_id TEXT NOT NULL,
      medicine_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      total_price NUMERIC(12, 2) NOT NULL,
      status TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS audit_logs (
      id UUID PRIMARY KEY,
      actor_id UUID,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  connected = true;
}

export async function closeDatabase() {
  await pool?.end();
  pool = null;
  connected = false;
}
