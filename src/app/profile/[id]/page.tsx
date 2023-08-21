'use client';

import {useState, useEffect, useMemo} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@/components/Profile';
import {IPromptData, IPromptCreator} from '@/types/typescriptTypes';

const GuestProfilePage = () => {
	const [guestPrompts, setGuestPrompts] = useState<IPromptData[]>([]);

	const {data: session} = useSession();
	const router = useRouter();

	const currentUserId: string = useMemo(() => {
		// @ts-ignore
		return session?.user!.id;
	}, [session?.user]);

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
			const url = new URL(
				`../api/users/${currentUserId}/prompt`,
				'http://localhost:3000'
			);
			const response = await fetch(url);

			if (!response.ok) {
				console.log(
					'Error occured while loading of my prompt from the database!'
				);
			}
			const promptsData: IPromptData[] = await response.json();

			setGuestPrompts(promptsData);
		};

		currentUserId && fetchPromptsFromDatabase();
	}, [currentUserId]);

	return (
		<section className='w-full flex justify-center items-center'>
			<Profile
				type={session?.user?.name ?? 'Guest'}
				desc='Welcome to your personalized profile!'
				promptArr={guestPrompts}
				handleDeletePrompt={(_id) => handleDeletePrompt(_id)}
				handleEditPrompt={(_id) => handleEditPrompt(_id)}
			/>
		</section>
	);
};
export default GuestProfilePage;