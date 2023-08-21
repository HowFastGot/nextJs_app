'use client';

import {FormEvent, useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Form from '@/components/Form';
import {ICreatedPosts} from '@/types/typescriptTypes';

function CreatePrompt() {
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [post, setPost] = useState<ICreatedPosts>({
		prompt: '',
		tag: '',
	});

	const {data: session} = useSession();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitting(true);

		try {
	
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
					// @ts-ignore
					userId: session?.user!.id,
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

	return (
		<>
			<Form type='Create' post={post} setPosts={setPost} submitting={submitting} handleSubmit={handleSubmit} />
		</>
	);
}
export default CreatePrompt;
