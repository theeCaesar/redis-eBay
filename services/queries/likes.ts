import { client } from "../redis";
import { userLikesKey, itemsKey } from "../keys";
import { getItems } from "./items";

export const userLikesItem = async (productID: string, userID: string) => {
  return client.sIsMember(userLikesKey(userID), productID);
};

export const likedItems = async (userID: string) => {
  const ids = await client.sMembers(userLikesKey(userID));

  return getItems(ids);
};

export const likeItem = async (productID: string, userID: string) => {
  const inserted = await client.sAdd(userLikesKey(userID), productID);

  if (inserted) {
    return client.hIncrBy(itemsKey(productID), "likes", 1);
  }
};

export const unlikeItem = async (productID: string, userID: string) => {
  const removed = await client.sRem(userLikesKey(userID), itemId);

  if (removed) {
    return client.hIncrBy(itemsKey(productID), "likes", -1);
  }
};

export const commonLikedItems = async (
  userOneId: string,
  userTwoId: string
) => {
  const ids = await client.sInter([
    userLikesKey(userOneId),
    userLikesKey(userTwoId),
  ]);

  return getItems(ids);
};
