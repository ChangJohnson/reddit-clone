import type { Comment } from '@prisma/client';
import { cache } from 'react';
import { db } from '@/db';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

// the "cache" from react will save result in the cache system. Only if the "postId" changes the components will fetch again to get new result. Otherwise as many times as the function gets called, it will always return the same result without refetching.
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: { select: { name: true, image: true } },
      },
    });
  }
);
