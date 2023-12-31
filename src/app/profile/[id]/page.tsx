'use client';

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@/components/Profile';
import {IPromptCreator, IPromptData} from '@/types/typescriptTypes';

const GuestProfilePage = ({params}: {params: {id: string}}) => {
	const [guestPrompts, setGuestPrompts] = useState<IPromptData[]>([]);
	const [userInfo, setUserInfo] = useState<IPromptCreator>();

	const router = useRouter();

	const handleDeletePrompt = async (_id: string) => {
		const isConfirmedDelete = confirm('Are you sure to delete this prompt?');

		if (!isConfirmedDelete) {
			return alert("Okay, we won't!");
		}

		try {
			const url = `/api/prompt/${_id}`;
			await fetch(url, {
				method: 'DELETE',
			});

			const filteredPrompts = guestPrompts.filter((post) => {
				return post._id !== _id;
			});

			setGuestPrompts(filteredPrompts);
		} catch (error) {
			console.log('Error has occured while deliting this post!');
		}
	};
	const handleEditPrompt = async (_id: string) => {
		router.push(`/update-prompt?id=${_id}`);
	};

	useEffect(() => {
		const fetchPromptsFromDatabase = async () => {
			const response = await fetch(`/api/users/${params.id}/prompt`);

			if (!response.ok) {
				console.log(
					'Error occured while loading of my prompt from the database!'
				);
			}

			const promptsData: {prompts: IPromptData[]; user: IPromptCreator} =
				await response.json();

			setGuestPrompts(promptsData.prompts);
			setUserInfo(promptsData.user);
		};

		params.id && fetchPromptsFromDatabase();
	}, [params.id]);

	return (
		<section className='w-full flex justify-center items-center'>
			<Profile
				type={userInfo?.username ?? 'Another user'}
				desc='Welcome to your personalized profile!'
				promptArr={guestPrompts}
				handleDeletePrompt={(_id) => handleDeletePrompt(_id)}
				handleEditPrompt={(_id) => handleEditPrompt(_id)}
			/>
		</section>
	);
};
export default GuestProfilePage;

