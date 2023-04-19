import type { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import prisma from '../../../app/lib/prismadb';

import CredentialsProvider from 'next-auth/providers/credentials';
import credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},

			//  TODO make pretty errors using react-toastify
			// @ts-ignore
			async authorize(credentials) {
				if (!credentials?.email || credentials?.password)
					throw new Error('Invalid credentials');
			},
		}),
	],
};
