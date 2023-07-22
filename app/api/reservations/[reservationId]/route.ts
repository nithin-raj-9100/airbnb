import { NextResponse, NextRequest } from 'next/server';

// [ ]internal imports
import getUser from '@/app/actions/getUser  ';
import prisma from '../../../lib/prismadb';

interface IParams {
	reservationId?: string;
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: IParams },
) {
	const currentUser = await getUser();

	if (!currentUser) NextResponse.error();

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== 'string')
		throw new Error('Invalid reservationId');

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [
				{ userId: currentUser?.id },
				{ listing: { userId: currentUser?.id } },
			],
		},
	});

	return NextResponse.json(reservation);
}
