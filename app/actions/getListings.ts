import prisma from '../lib/prismadb';

export default async function getListings() {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
		//

		// const test = await prisma.reservation.findMany({
		// 	where: {},
		// });

		//
		const safeListings = listings.map(listing => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
		return safeListings;
	} catch (error: any) {
		console.log(error);
		throw new Error('Could not get listings');
	}
}
