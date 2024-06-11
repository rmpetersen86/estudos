/*
  Warnings:

  - You are about to drop the `movements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `movement_id` on the `equipments` table. All the data in the column will be lost.
  - You are about to drop the column `movement_id` on the `materials` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "movements";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_equipments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "patrimony" TEXT,
    "contract" TEXT,
    "details" TEXT,
    "place_id" TEXT NOT NULL,
    CONSTRAINT "equipments_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_equipments" ("brand", "contract", "details", "id", "model", "name", "patrimony", "place_id", "serial", "status", "type") SELECT "brand", "contract", "details", "id", "model", "name", "patrimony", "place_id", "serial", "status", "type" FROM "equipments";
DROP TABLE "equipments";
ALTER TABLE "new_equipments" RENAME TO "equipments";
CREATE TABLE "new_materials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "details" TEXT,
    "place_id" TEXT NOT NULL,
    CONSTRAINT "materials_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_materials" ("brand", "details", "id", "model", "name", "place_id", "quantity", "status", "type") SELECT "brand", "details", "id", "model", "name", "place_id", "quantity", "status", "type" FROM "materials";
DROP TABLE "materials";
ALTER TABLE "new_materials" RENAME TO "materials";
PRAGMA foreign_key_check("equipments");
PRAGMA foreign_key_check("materials");
PRAGMA foreign_keys=ON;
