import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth/next';

// [ ]internal import
import prisma from '../../lib/prismadb';

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { email, name, password } = body;
	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword,
				favoriteIds: 'foo',
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		console.log('here is the error', error);
	}
}
