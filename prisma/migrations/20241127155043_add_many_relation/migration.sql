-- CreateTable
CREATE TABLE `DatasetsOnElements` (
    `id_dataset` INTEGER NOT NULL,
    `id_element` INTEGER NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_dataset`, `id_element`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DatasetsOnElements` ADD CONSTRAINT `DatasetsOnElements_id_dataset_fkey` FOREIGN KEY (`id_dataset`) REFERENCES `datasets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatasetsOnElements` ADD CONSTRAINT `DatasetsOnElements_id_element_fkey` FOREIGN KEY (`id_element`) REFERENCES `elements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
