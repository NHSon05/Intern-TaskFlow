-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB;
