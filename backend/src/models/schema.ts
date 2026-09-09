import { store } from '../store';

/** Phase 4 persistence seam. The store is intentionally isolated so SQLite/PostgreSQL can replace it without changing routes. */
export async function initializeSchema(_db?: unknown) {
  await store.seed();
}
