-- AlterTable
ALTER TABLE "events" ADD COLUMN     "latitude" DECIMAL(9,6) DEFAULT 0,
ADD COLUMN     "longitude" DECIMAL(9,6) DEFAULT 0;
