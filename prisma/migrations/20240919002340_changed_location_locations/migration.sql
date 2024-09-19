/*
  Warnings:

  - You are about to drop the column `name` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assetnum` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asset" DROP COLUMN "name",
ADD COLUMN     "assetnum" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT;

-- DropTable
DROP TABLE "location";

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
