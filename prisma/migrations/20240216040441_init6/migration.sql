/*
  Warnings:

  - The primary key for the `CommentReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CommentReaction` table. All the data in the column will be lost.
  - The primary key for the `PostReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostReaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommentReaction" DROP CONSTRAINT "CommentReaction_pkey",
DROP COLUMN "id",
ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("commentId", "authorId");

-- AlterTable
ALTER TABLE "PostReaction" DROP CONSTRAINT "PostReaction_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("postId", "authorId");
