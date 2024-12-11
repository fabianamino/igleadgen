import db from "@/lib/db";
import { Subscription, SubscriptionStatus } from "@prisma/client";

interface CreateSubscriptionData {
  userId: string;
  priceId: string;
  customerId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  features: any;
}

interface UpdateSubscriptionData {
  currentPeriodEnd?: Date;
  status?: SubscriptionStatus;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: Date | null;
  features?: any;
  metadata?: any;
}

export async function createSubscription(data: CreateSubscriptionData): Promise<Subscription> {
  try {
    return await db.subscription.create({
      data: {
        userId: data.userId,
        priceId: data.priceId,
        customerId: data.customerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        status: 'ACTIVE',
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        features: data.features
      }
    });
  } catch (error) {
    console.error("Error in createSubscription:", error);
    throw error;
  }
}

export async function updateSubscription(
  userId: string,
  data: UpdateSubscriptionData
): Promise<Subscription | null> {
  try {
    return await db.subscription.update({
      where: { userId },
      data
    });
  } catch (error) {
    console.error("Error in updateSubscription:", error);
    return null;
  }
}

export async function cancelSubscription(
  userId: string,
  cancelImmediately: boolean = false
): Promise<Subscription | null> {
  try {
    return await db.subscription.update({
      where: { userId },
      data: {
        status: cancelImmediately ? 'CANCELED' : 'ACTIVE',
        cancelAtPeriodEnd: !cancelImmediately,
        canceledAt: new Date()
      }
    });
  } catch (error) {
    console.error("Error in cancelSubscription:", error);
    return null;
  }
}

export async function createOrUpdateSubscriptionPlan(
  priceId: string,
  data: {
    name: string;
    description: string;
    price: number;
    interval: string;
    features: any;
    metadata?: any;
  }
): Promise<SubscriptionPlan | null> {
  try {
    return await db.subscriptionPlan.upsert({
      where: { priceId },
      create: {
        priceId,
        ...data
      },
      update: data
    });
  } catch (error) {
    console.error("Error in createOrUpdateSubscriptionPlan:", error);
    return null;
  }
}
