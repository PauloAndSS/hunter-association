import { hunters } from "../models/registry";

const STORAGE_KEY = "hunternet-session";

export interface Session {
  name: string;
  licenseNumber: number;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function authenticate(playerName: string, licenseNumber: string): Session | null {
  const normalizedName = normalize(playerName);
  const parsedNumber = Number(licenseNumber.trim());
  if (!normalizedName || Number.isNaN(parsedNumber)) return null;

  const match = hunters.find(
    (hunter) => normalize(hunter.name) === normalizedName && hunter.licenseNumber === parsedNumber,
  );
  if (!match) return null;

  return { name: match.name, licenseNumber: match.licenseNumber };
}

export function getSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore storage failures (private mode, disabled storage, etc.)
  }
}

export function clearSession(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
