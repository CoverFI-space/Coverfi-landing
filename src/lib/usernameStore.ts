const USERNAMES_KEY = 'prisma_usernames';
const SESSION_KEY = 'prisma_session';

export type PrismaSession = {
  username: string;
  walletAddress: string;
};

function readUsernames() {
  try {
    const stored = window.localStorage.getItem(USERNAMES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function getStoredSession() {
  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as PrismaSession) : null;
  } catch {
    return null;
  }
}

export function reserveUsername(username: string, walletAddress: string) {
  const normalized = username.trim().toLowerCase();
  const usernames = readUsernames();

  if (usernames.includes(normalized)) {
    throw new Error('That username is already taken. Please choose another one.');
  }

  const nextUsernames = [...usernames, normalized];
  const session = { username: username.trim(), walletAddress };

  window.localStorage.setItem(USERNAMES_KEY, JSON.stringify(nextUsernames));
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
