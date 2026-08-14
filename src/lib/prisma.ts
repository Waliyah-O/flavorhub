import * as Prisma from "@prisma/client";

const PrismaClient = (Prisma as any).PrismaClient as new () => any;

if (!PrismaClient) {
  throw new Error(
    "PrismaClient is unavailable. Run `npx prisma generate` to generate the client.",
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
