import { NextRequest, NextResponse } from 'next/server';

// [ ]internal imports
import primsa from '../../lib/prismadb';
import getUser from '@/app/actions/getUser  ';

// interface Params {
// 	listingId: string;
// 	startDate: Date;
// 	endDate: Date;
// 	totalPrice: number;
// }

export async function POST(req: Request) {
	const currentUser = await getUser();
	if (!currentUser) NextResponse.error();

	const body = await req.json();

	const {
		listingId,
		startDate,
		endDate,
		totalPrice,
	}: {
		listingId: string;
		startDate: Date;
		endDate: Date;
		totalPrice: number;
	} = body;
	if (!listingId || !startDate || !totalPrice || !endDate) {
		return NextResponse.error();
	}

	const listingAndReservation = await primsa.listing.update({
		where: {
			id: listingId,
		},
		data: {
			reservations: {
				create: {
					userId: currentUser?.id ?? listingId,
					startDate: startDate,
					endDate: endDate,
					totalPrice: totalPrice,
				},
			},
		},
	});

	console.log(listingAndReservation);

	return NextResponse.json(listingAndReservation);
}
