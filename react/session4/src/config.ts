const API_BASE = "http://localhost:3000";

if (!API_BASE) {
  throw new Error(
    "config: API_BASE is required."
  );
}

export const config = {
  apiBase: API_BASE,
};