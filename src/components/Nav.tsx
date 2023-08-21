'use client';

import Link from 'next/link';
import Image from 'next/image';

import {useState, useEffect} from 'react';
import {signIn, signOut, getProviders, useSession} from 'next-auth/react';
import {
	BuiltInProviderType,
	ClientSafeProvider,
	LiteralUnion,
	ProvidersStateListType,
} from '@/auth';

import UserImage from './UserImage';

const Nav = () => {
	const {data: session} = useSession();

	const [providers, setProviders] = useState<ProvidersStateListType>();
	const [isOpenDopDown, setOpenDropDown] = useState<boolean>(false);

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
					/>
					<p className='logo_text'>Promtopia</p>
				</Link>
				{/* // Desktop Navigation */}
				<div className='sm:flex hidden'>
					{session?.user ? (
						<div className='flex gap-3 md:gap-5'>
							<Link href='/create-prompt' className='black_btn'>
								Create Post
							</Link>

							<button
								onClick={() => signOut()}
								type='button'
								className='outline_btn'
							>
								Sign Out
							</button>

							<figure className='block relative'>
								<UserImage
									userImageSrc={session.user.image ?? '/assets/images/logo.svg'}
								/>
							</figure>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => {
									return (
										<button
											key={provider.name}
											className='black_btn hover:bg-red-600 hover:text-black-500'
											onClick={() => signIn(provider.id)}
										>
											Sign In
										</button>
									);
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

							{isOpenDopDown && (
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
									return (
										<button
											key={provider.name}
											onClick={() => signIn(provider.id)}
										>
											Sign In
										</button>
									);
								})}
						</>
					)}
				</div>
			</nav>
		</>
	);
};
export default Nav;
