import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// [ ]internal imports
import prisma from '../../../app/lib/prismadb';

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

			async authorize(credentials: any) {
				if (!credentials.email || !credentials.password) {
					throw new Error('Invalid credentials');
				}

				const user = await prisma.user.findUniqueOrThrow({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error('invalid credentuials');
				}

				const isCorrect = await bcrypt.compare(
					credentials.password,
					user.hashedPassword,
				);

				if (!isCorrect) {
					throw new Error('invalide credentials');
				}

				// [ ]
				return user;
			},
		}),
		//  TODO make pretty errors using react-toastify
	],

	pages: {
		signIn: '/',
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
