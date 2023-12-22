"use client";

import { useActiveChannel } from "./use-active-channel";
import { useUserSubscription } from "./use-user-subscription";

export function UserSubscriptionProvider() {
  useActiveChannel();
  useUserSubscription();

  return null;
}
