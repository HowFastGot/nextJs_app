'use client';
import {useState} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {usePathname} from 'next/navigation';

import {IPromptCardInterface} from '@/types/typescriptTypes';
import {handleCopyIconChange} from '@/utils/promptCardFunctions/handleCopyIconChange';
import {manageTags} from '@/utils/promptCardFunctions/manageTags';

import UserImage from './UserImage';

const PromtCard = ({
	image,
	tag,
	promptID,
	prompt,
	creator,
	handleEditPrompt,
	handleDeletePrompt,
	handleTagClick,
}: IPromptCardInterface) => {
	const [isCopied, setCopied] = useState<boolean>(false);

	const {data: session} = useSession();
	const pathname = usePathname();

	const cardCopyIcon: string = isCopied
		? '/assets/icons/tick.svg'
		: '/assets/icons/copy.svg';

	const edit_deleteBlockCondition: boolean | undefined =
		session?.user &&
		pathname === '/profile' &&
		// @ts-ignore
		session.user!.id === creator._id;

	return (
		<article className='prompt_card'>
			<div className='flex items-start justify-around gap-2 '>
				<figure className='flex-shrink-0 flex justify-center items-center gap-3 cursor-pointer'>
					<UserImage
						userImageSrc={image ?? 'unknown'}
						userId={
							creator.email.includes('skaretskiy1999@gmail.com')
								? null // @ts-ignore
								: creator._id
						}
					/>
				</figure>
				<div>
					<h6 className='font-roboto font-semibold text-gray-900'>
						{creator.username}
					</h6>
					<p className='font-roboto text-sm text-gray-500'>{creator.email}</p>
				</div>
				<button
					className='copy_btn align-top relative -top-4'
					onClick={() => handleCopyIconChange(prompt, setCopied)}
				>
					<Image src={cardCopyIcon} alt='Copy icon' width={10} height={10} />
				</button>
			</div>

			<p className='my-7 font-roboto text-sm text-gray-700'>{prompt}</p>
			<div>
				{manageTags(tag).map((t) => {
					return (
						<button
							key={t}
							onClick={(e) => handleTagClick && handleTagClick(t)}
							className='mr-4'
						>
							<span className='font-roboto blue_gradient text-sm'>#{t}</span>
						</button>
					);
				})}
			</div>

			{edit_deleteBlockCondition ? (
				<div className='p-5 text-center font-roboto'>
					<button
						className='mr-3 text-sm green_gradient font-semibold'
						onClick={() => handleEditPrompt && handleEditPrompt(promptID)}
					>
						Edit
					</button>
					<button
						className='text-sm ml-3 orange_gradient font-semibold'
						onClick={() => handleDeletePrompt && handleDeletePrompt(promptID)}
					>
						Delete
					</button>
				</div>
			) : null}
		</article>
	);
};

export default PromtCard;
