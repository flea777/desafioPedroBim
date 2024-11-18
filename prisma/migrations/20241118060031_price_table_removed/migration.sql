/*
  Warnings:

  - You are about to drop the `prices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `weekdayPrice` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekdayPriceLoyalty` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekendPrice` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekendPriceLoyalty` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "prices";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "modelYear" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weekdayPrice" REAL NOT NULL,
    "weekendPrice" REAL NOT NULL,
    "weekdayPriceLoyalty" REAL NOT NULL,
    "weekendPriceLoyalty" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_cars" ("category", "createdAt", "id", "manufacturer", "model", "modelYear", "updatedAt") SELECT "category", "createdAt", "id", "manufacturer", "model", "modelYear", "updatedAt" FROM "cars";
DROP TABLE "cars";
ALTER TABLE "new_cars" RENAME TO "cars";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
