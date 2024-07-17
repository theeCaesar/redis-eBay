import type { Session } from "../types";
import { sessionsKey } from "../keys";
import { client } from "../redis";

export const saveSession = async (session: Session) => {
  return client.hSet(sessionsKey(session.id), serialize(session));
};

const deserialize = (id: string, session: { [key: string]: string }) => {
  return {
    id,
    userId: session.userId,
    username: session.username,
  };
};

export const getSession = async (id: string) => {
  const session = await client.hGetAll(sessionsKey(id));

  if (Object.keys(session).length === 0) {
    return null;
  }

  return deserialize(id, session);
};

const serialize = (session: Session) => {
  return {
    userId: session.userId,
    username: session.username,
  };
};
