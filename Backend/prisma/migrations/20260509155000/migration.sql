/*
  Warnings:

  - The values [used,disabled] on the enum `VoucherStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoucherStatus_new" AS ENUM ('active', 'inactive', 'expired');
ALTER TABLE "vouchers" ALTER COLUMN "status" TYPE "VoucherStatus_new" USING ("status"::text::"VoucherStatus_new");
ALTER TYPE "VoucherStatus" RENAME TO "VoucherStatus_old";
ALTER TYPE "VoucherStatus_new" RENAME TO "VoucherStatus";
DROP TYPE "public"."VoucherStatus_old";
COMMIT;
