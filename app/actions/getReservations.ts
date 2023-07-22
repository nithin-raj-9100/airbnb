import prisma from '../lib/prismadb';

interface IParams {
	listingId?: string;
	userId?: string;
	authorId?: string;
}

export default async function getReservations(params: IParams) {
	try {
		const { listingId, userId, authorId } = params;

		const query: any = {};

		if (listingId) {
			query.listingId = listingId;
		}
		if (userId) {
			query.userId = userId;
		}
		if (authorId) {
			query.listing = { userId: authorId };
		}

		const reservations = await prisma.reservation.findMany({
			where: query,
			include: {
				listing: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeReservation = reservations?.map(reservation => {
			// dates sucks
			return {
				...reservation,
				createdAt: reservation.createdAt.toISOString(),
				updatedAt: reservation.endDate.toISOString(),
				startDate: reservation.startDate.toISOString(),
				endDate: reservation.endDate.toISOString(),
				listing: {
					...reservation.listing,
					createdAt: reservation.listing.createdAt.toISOString(),
				},
			};
		});

		return safeReservation;
	} catch (error: any) {
		throw new Error(error);
	}
}
