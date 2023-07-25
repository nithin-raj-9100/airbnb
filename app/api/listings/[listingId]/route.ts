// import { NextResponse } from 'next/server';
// import getUser from '@/app/actions/getUser  ';
// import prisma from '../../../lib/prismadb';

// interface Iparams {
// 	listingId?: string;
// }

// export async function DELETE(req: Request, { params }: { params: Iparams }) {
// 	const currentUser = await getUser();

// 	if (!currentUser) {
// 		return NextResponse.error();
// 	}

// 	const { listingId } = params;

// 	if (!listingId || typeof listingId !== 'string')
// 		throw new Error('Invalid Id');

// 	const listing = await prisma.listing.deleteMany({
// 		where: {
// 			id: listingId,
// 			userId: currentUser.id,
// 		},
// 	});

// 	return NextResponse.json(listing);
// }
