-- CreateTable
CREATE TABLE "movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "contact" TEXT NOT NULL
);

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
    "movement_id" TEXT,
    CONSTRAINT "equipments_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "equipments_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "movements" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "movement_id" TEXT,
    CONSTRAINT "materials_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "materials_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "movements" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_materials" ("brand", "details", "id", "model", "name", "place_id", "quantity", "status", "type") SELECT "brand", "details", "id", "model", "name", "place_id", "quantity", "status", "type" FROM "materials";
DROP TABLE "materials";
ALTER TABLE "new_materials" RENAME TO "materials";
PRAGMA foreign_key_check("equipments");
PRAGMA foreign_key_check("materials");
PRAGMA foreign_keys=ON;
