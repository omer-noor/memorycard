/*
  Warnings:

  - Added the required column `gameId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gameId" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "spoilers" BOOLEAN NOT NULL DEFAULT false;
