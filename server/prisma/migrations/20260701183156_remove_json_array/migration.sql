/*
  Warnings:

  - You are about to drop the column `tags` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferences";
