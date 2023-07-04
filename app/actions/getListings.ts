import prisma from '../lib/prismadb';

export default async function getListings() {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		return listings;
	} catch (error) {}
}
