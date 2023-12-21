"use client";

import { useActiveChannel } from "~/hooks/subscriptions/use-active-channel";
import { useUserSubscription } from "~/hooks/subscriptions/use-user-subscription";

export function GeneralSubscriptionProvider() {
  useActiveChannel();
  useUserSubscription();

  return null;
}
