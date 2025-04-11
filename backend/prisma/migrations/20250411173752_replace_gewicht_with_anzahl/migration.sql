/*
  Warnings:

  - You are about to drop the column `gewicht` on the `Paket` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "anzahl" INTEGER NOT NULL DEFAULT 1,
    "erstellt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Paket" ("erstellt", "id", "name") SELECT "erstellt", "id", "name" FROM "Paket";
DROP TABLE "Paket";
ALTER TABLE "new_Paket" RENAME TO "Paket";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
