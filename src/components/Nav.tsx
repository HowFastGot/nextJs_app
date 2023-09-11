'use client';

import Link from 'next/link';
import Image from 'next/image';

import {useState, useEffect} from 'react';
import {signOut, getProviders, useSession} from 'next-auth/react';

import SignInButton from './signInButton';

import {
	BuiltInProviderType,
	ClientSafeProvider,
	LiteralUnion,
	ProvidersStateListType,
} from '@/auth';

const Nav = () => {
	const {data: session} = useSession();

	const [providers, setProviders] = useState<ProvidersStateListType>();
	const [isOpenDropDown, setOpenDropDown] = useState<boolean>(false);

	useEffect(() => {
		const setAvailableProviders = async () => {
			const response: Record<
				LiteralUnion<BuiltInProviderType, string>,
				ClientSafeProvider
			> | null = await getProviders();

			setProviders(response);
		};

		setAvailableProviders();
	}, []);

	return (
		<>
			<nav className='w-full flex-between mb-16 pt-3'>
				<Link href='/' className='flex gap-2 flex-center'>
					<Image
						src='/assets/images/logo.svg'
						alt='user image'
						width={30}
						height={30}
						priority
					/>
					<p className='logo_text'>Promtopia</p>
				</Link>
				{/* // Desktop Navigation */}
				<div className='sm:flex hidden'>
					{session?.user ? (
						<div className='flex gap-3 md:gap-5'>
							<Link href='/create-prompt' className='black_btn'>
								Create Prompt
							</Link>

							<button
								onClick={() => signOut()}
								type='button'
								className='outline_btn'
							>
								Sign Out
							</button>

							<figure className='block relative'>
								<Link href='/profile' className='rounded-full'>
									<Image
										src={session.user.image ?? '/assets/images/logo.svg'}
										alt='user avatar image'
										width='37'
										height='37'
										className='rounded-full object-contain'
										quality={100}
									></Image>
								</Link>
							</figure>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => {
									return <SignInButton key={provider.id} provider={provider} />;
								})}
						</>
					)}
				</div>

				{/* Mobile navigation */}

				<div className='sm:hidden flex relative '>
					{session?.user ? (
						<div className='flex'>
							<Image
								src={session.user.image ?? '/assets/images/logo.svg'}
								alt='user avatar image'
								width='30'
								height='30'
								className='rounderd-full'
								onClick={() => setOpenDropDown((prev) => !prev)}
							></Image>

							{isOpenDropDown && (
								<div className='dropdown'>
									<Link
										href='/profile'
										className='dropdown_link'
										onClick={() => setOpenDropDown(false)}
									>
										My profile
									</Link>
									<Link
										href='/create-prompt'
										className='dropdown_link'
										onClick={() => setOpenDropDown(false)}
									>
										Create Prompt
									</Link>
									<button
										type='button'
										onClick={() => {
											setOpenDropDown(false);
											signOut();
										}}
										className='mt-5 w-full black_btn'
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => {
									return <SignInButton key={provider.id} provider={provider} />;
								})}
						</>
					)}
				</div>
			</nav>
		</>
	);
};
export default Nav;
