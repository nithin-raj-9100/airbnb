import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;

// lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
// 	prisma = new PrismaClient();
// } else {
// 	if (!global.prisma) {
// 		global.prisma = new PrismaClient();
// 	}
// 	prisma = global.prisma;
// }

// export default prisma;
