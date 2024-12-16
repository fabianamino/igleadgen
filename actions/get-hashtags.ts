'use server';

import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/data/user";
import { auth } from "@/auth";
import jwt from "jsonwebtoken";

interface JWTPayload {
  email?: string;
  sub?: string;
}

export async function getHashtags(page: number = 1, pageSize: number = 10) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      throw new Error('Authentication required');
    }

    // Get user from database using email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const skip = (page - 1) * pageSize;
    const maxResults = 100;

    const [hashtags, total] = await Promise.all([
      prisma.hashtag.findMany({
        where: {
          userId: user.id,
          NOT: {
            name: null
          }
        },
        skip,
        take: Math.min(pageSize, maxResults - skip),
        orderBy: [
          {
            searchedAt: 'desc'
          },
          {
            postsCount: 'desc'
          }
        ],
        select: {
          id: true,
          name: true,
          postsCount: true,
          avgLikes: true,
          avgComments: true,
          searchedAt: true,
          relatedHashtags: {
            select: {
              relatedHashtag: {
                select: {
                  name: true,
                  postsCount: true
                }
              }
            },
            take: 3
          }
        }
      }),
      prisma.hashtag.count({
        where: {
          userId: user.id,
          NOT: {
            name: null
          }
        }
      })
    ]);

    const formattedHashtags = hashtags.map(hashtag => ({
      ...hashtag,
      posts: hashtag.postsCount,
      relatedHashtags: hashtag.relatedHashtags.map(rel => ({
        name: rel.relatedHashtag.name,
        posts: rel.relatedHashtag.postsCount
      }))
    }));

    return {
      hashtags: formattedHashtags,
      total: Math.min(total, maxResults)
    };
  } catch (error) {
    console.error('Error in getHashtags:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch hashtags');
  }
}
