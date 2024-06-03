/*
  Warnings:

  - A unique constraint covering the columns `[favorited_product_id,users_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "favorites_users_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "favorites_favorited_product_id_users_id_key" ON "favorites"("favorited_product_id", "users_id");
