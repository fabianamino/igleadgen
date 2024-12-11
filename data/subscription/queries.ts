import db from "@/lib/db";
import { Subscription, SubscriptionPlan } from "@prisma/client";

export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  try {
    return await db.subscription.findUnique({
      where: { userId }
    });
  } catch (error) {
    console.error("Error in getSubscriptionByUserId:", error);
    return null;
  }
}

export async function getActivePlans(): Promise<SubscriptionPlan[]> {
  try {
    return await db.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' }
    });
  } catch (error) {
    console.error("Error in getActivePlans:", error);
    return [];
  }
}

export async function getPlanByPriceId(priceId: string): Promise<SubscriptionPlan | null> {
  try {
    return await db.subscriptionPlan.findUnique({
      where: { priceId }
    });
  } catch (error) {
    console.error("Error in getPlanByPriceId:", error);
    return null;
  }
}

export async function getUsersWithExpiringSubscriptions(daysThreshold: number = 7): Promise<Subscription[]> {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);

  try {
    return await db.subscription.findMany({
      where: {
        AND: [
          { status: 'ACTIVE' },
          { currentPeriodEnd: { lte: thresholdDate } },
          { cancelAtPeriodEnd: false }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Error in getUsersWithExpiringSubscriptions:", error);
    return [];
  }
}
