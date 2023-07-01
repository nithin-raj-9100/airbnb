import { NextRequest, NextResponse } from 'next/server';

// [ ]internal import
import prisma from '../../lib/prismadb';
import getUser from '../../actions/getUser';

export async function POST(req: NextRequest) {
	const currentUser = await getUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await req.json();

	const {
		title,
		description,
		price,
		location,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
	} = body;

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			// location: { create: { value: location.value } },
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id,
		},
	});
	console.log('listing is ', listing);
	return NextResponse.json(listing);
}
