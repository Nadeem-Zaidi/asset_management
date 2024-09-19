-- CreateTable
CREATE TABLE "workorder" (
    "id" TEXT NOT NULL,
    "wonum" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assetId" TEXT,

    CONSTRAINT "workorder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workorder" ADD CONSTRAINT "workorder_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
