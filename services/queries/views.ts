import { client } from "../redis";

export const incrementView = async (itemId: string, userId: string) => {
  return client.incrementView(itemId, userId);
};
