import { getServerSession } from 'next-auth/next';

// [ ]internal imports
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '../lib/prismadb';

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function gerUser() {
	try {
		const session = await getSession();
		if (!session?.user?.email) {
			return;
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		});

		if (!user) {
			return;
		}

		console.log(user);

		// return {
		// 	...user,
		// 	createdAt: user.createdAt.toISOString(),
		// 	updatedAt: user.updatedAt.toISOString(),
		// 	emailVerified: user.emailVerified?.toISOString() || null,
		// };
		// @ts-ignore
		return user;
	} catch (error) {
		return;
	}
}