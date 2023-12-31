import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';

import Provider from '@/components/Provider';
import Nav from '@/components/Nav';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700', '900'],
	display: 'swap',
});
import '@/styles/globals.scss';

export const metadata: Metadata = {
	title: 'My own Next.js app!',
	description: 'Discover and Share AI prompts',
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<div className='main'>
					<div className='gradient' />
				</div>

				<Provider>
					<main className='app'>
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};
export default RootLayout;
