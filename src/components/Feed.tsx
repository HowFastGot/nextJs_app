'use client';

import {useState, useEffect, useDeferredValue} from 'react';

import PromtCard from './PromtCard';

import {IPromptData} from '@/types/typescriptTypes';

const Feed = () => {
	const [prompts, setPrompts] = useState<IPromptData[]>([]);
	const [filteredPrompts, setFilteredPrompts] = useState<IPromptData[]>([]);

	const [searchData, setSearchData] = useState('');
	const defferedValue: string | number = useDeferredValue(searchData);

	useEffect(() => {
		if (prompts.length < 1) return;

		const filteredArr = prompts.filter((prompt) => {
			if (
				prompt.creator.username
					.toLocaleLowerCase()
					.includes(defferedValue.toLocaleLowerCase()) ||
				prompt.creator.email
					.toLocaleLowerCase()
					.includes(defferedValue.toLocaleLowerCase()) ||
				prompt.prompt
					.toLocaleLowerCase()
					.includes(defferedValue.toLocaleLowerCase()) ||
				prompt.tag
					.toLocaleLowerCase()
					.includes(defferedValue.toLocaleLowerCase())
			) {
				return prompt;
			}
		});

		setFilteredPrompts(filteredArr);
	}, [defferedValue, prompts]);

	useEffect(() => {
		const fetchPromptsFromDatabase = async () => {
			const response = await fetch('/api/prompt');

			if (!response.ok) {
				console.log('Error occured while loading of prompt from the database!');
			}
			const promptsData: IPromptData[] = await response.json();

			setPrompts(promptsData);
		};

		fetchPromptsFromDatabase();
	}, []);

	return (
		<section className='feed'>
			<form className='w-full'>
				<input
					type='text'
					placeholder='Search a prompt by its data...'
					value={searchData}
					onChange={(e) => setSearchData(e.target.value)}
					className='search_input'
					required
				/>
			</form>

			<PromptCardList
				promptArray={searchData.length > 0 ? filteredPrompts : prompts}
				handleTagClick={(text: string) => setSearchData(text)}
			/>
		</section>
	);
};

function PromptCardList({
	promptArray,
	handleTagClick,
}: {
	promptArray: IPromptData[];
	handleTagClick: (text: string) => void;
}) {
	if (promptArray.length < 1) {
		return null;
	}

	return (
		<div className='prompt_layout'>
			{promptArray?.map(({creator, _id, prompt, tag}) => {
				if (!creator._id) {
					return null;
				}

				return (
					<PromtCard
						key={_id}
						promptID={_id}
						tag={tag}
						prompt={prompt}
						creator={creator}
						handleTagClick={handleTagClick}
					/>
				);
			})}
		</div>
	);
}
export default Feed;
