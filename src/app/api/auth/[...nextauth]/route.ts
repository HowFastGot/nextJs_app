import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import {connectToDB} from '@/utils/database';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? 'unknown',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'unknown',
		}),
	],
	callbacks: {
		async session({session}) {
			const sessionUser = await User.findOne({email: session.user!.email});
			//@ts-ignore
			session.user!.id = sessionUser._id.toString();

			return session;
		},
		async signIn({account, profile, user, credentials}) {
			try {
				await connectToDB();

				// check if user already exists
				const userExists = await User.findOne({email: profile!.email});

				// if not, create a new document and save user in MongoDB
				if (!userExists) {
					await User.create({
						email: profile!.email,
						username: profile!.name!.replace(' ', '').toLowerCase(),
						//@ts-ignore
						image: profile!.picture,
					});
				}

				return true;
			} catch (error) {
				const errorMessage = 'Error checking if user exists: ';

				if (error instanceof Error) {
					console.log(errorMessage, error.message);
				} else {
					console.log(errorMessage);
				}

				return false;
			}
		},
	},
});

export {handler as GET, handler as POST};
