/*
  Warnings:

  - You are about to drop the column `name` on the `locations` table. All the data in the column will be lost.
  - Added the required column `description` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifieddate` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "asset" ADD COLUMN     "changedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "modifieddate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usersId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
