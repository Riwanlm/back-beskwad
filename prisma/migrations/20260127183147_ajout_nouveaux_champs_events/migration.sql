/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_picture",
ADD COLUMN     "avatar" TEXT;
