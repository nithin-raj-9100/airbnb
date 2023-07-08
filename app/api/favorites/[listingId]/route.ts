import { NextResponse, NextRequest } from 'next/server';

// [ ]internal imports
import getUser from '@/app/actions/getUser  ';
import prisma from '../../../lib/prismadb';

interface Iparams {
	listingId?: string;
}

export async function POST(req: Request, { params }: { params: Iparams }) {
	const currentUser = await getUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== 'string') {
		throw new Error('Invalid Id');
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(listingId);

	console.log('favoriteIds', favoriteIds);

	const user = await prisma.user.update({
		where: {
			id: currentUser?.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json({ user });
}

// TODO

export async function DELETE(req: Request, { params }: { params: Iparams }) {
	console.log('delete');
	const currentUser = await getUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== 'string') {
		throw new Error('Invalid Id');
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds = favoriteIds.filter(id => id !== listingId);

	console.log('favoriteIds', favoriteIds);

	const user = await prisma.user.update({
		where: {
			id: currentUser?.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json({ user });
}
