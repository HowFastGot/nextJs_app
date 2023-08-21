'use client';

import {FormEvent, useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import Form from '@/components/Form';
import {ICreatedPosts, IPromptData} from '@/types/typescriptTypes';

function UpdatePrompt() {
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [post, setPost] = useState<ICreatedPosts>({
		prompt: '',
		tag: '',
	});

	const router = useRouter();
	const promptID: string | null = useSearchParams().get('id');

	const handleUpdatePrompt = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitting(true);

		if (!promptID) {
			return alert("The pompt id wasn't found!");
		}

		try {
			const url = new URL(`../api/prompt/${promptID}`, 'http://localhost:3000');

			const response = await fetch(url, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			setSubmitting(false);

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log('Submitting form error, check create-prompt page file!');
		}
	};

	useEffect(() => {
		const fetchExistingPrompt = async () => {
			const url = new URL(`../api/prompt/${promptID}`, 'http://localhost:3000');
			const response = await fetch(url);

			if (!response.ok) {
				console.log('Error has occured while loading this edit prompt!');
			}

			const prompt: IPromptData = await response.json();

			setPost({
				prompt: prompt.prompt,
				tag: prompt.tag,
			});
		};

		promptID && fetchExistingPrompt();
	}, [promptID]);

	return (
		<>
			<Form
				type='Edit'
				post={post}
				setPosts={setPost}
				submitting={submitting}
				handleSubmit={handleUpdatePrompt}
			/>
		</>
	);
}
export default UpdatePrompt;
