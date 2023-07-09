import prisma from '../lib/prismadb';

interface Iparams {
	listingId: string;
}

export default async function getListingById(params: Iparams) {
	try {
		const { listingId } = params;

		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId,
			},
			include: {
				user: true,
			},
		});

		if (!listing) {
			return null;
		}

		return listing;
	} catch (error) {
		throw new Error('Error occured');
	}
}
