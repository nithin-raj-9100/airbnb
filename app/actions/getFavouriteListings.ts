import prisma from '../lib/prismadb';

import getUser from './getUser';

export default async function getFavouriteListings() {
	try {
		const currentUser = await getUser();

		if (!currentUser) return [];

		const favourites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		});

		const safeFavourites = favourites.map(favourite => ({
			...favourite,
			createdAt: favourite.createdAt.toISOString(),
		}));

		return safeFavourites;
	} catch (error: any) {
		throw new Error(error);
	}
}
