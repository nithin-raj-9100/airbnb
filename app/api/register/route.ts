import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prismadb';
import { getServerSession } from 'next-auth/next';

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
				favoriteIds: 'bar',
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		console.log('here is the error', error);
	}
}
