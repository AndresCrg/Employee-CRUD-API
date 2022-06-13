-- CreateTable
CREATE TABLE `credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `credentials_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(70) NOT NULL,
    `document_type` ENUM('CC', 'CE', 'PA', 'TI') NOT NULL,
    `document` VARCHAR(45) NOT NULL,
    `department` VARCHAR(45) NOT NULL,
    `contract_expiration_date` DATE NOT NULL,
    `position` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `state` ENUM('A', 'B', 'D') NULL DEFAULT 'A',

    UNIQUE INDEX `employees_document_key`(`document`),
    UNIQUE INDEX `employees_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `expiration` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
