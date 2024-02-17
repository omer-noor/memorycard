/*
  Warnings:

  - Added the required column `gameName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gameCover" TEXT,
ADD COLUMN     "gameName" TEXT NOT NULL;
