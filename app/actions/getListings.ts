import prisma from '../lib/prismadb';

export interface IListingParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export default async function getListings(params: IListingParams) {
	try {
		const {
			userId,
			bathroomCount,
			category,
			endDate,
			guestCount,
			locationValue,
			roomCount,
			startDate,
		} = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = category;
		}

		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}

		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: {
									gte: startDate,
								},
								startDate: {
									lte: startDate,
								},
							},
							{
								startDate: {
									lte: endDate,
								},
								endDate: {
									gte: endDate,
								},
							},
						],
					},
				},
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

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
