'use client';

import {useState, useEffect, useDeferredValue} from 'react';

import PromtCard from './PromtCard';
import {IPromptData} from '@/types/typescriptTypes';
import {defaultArray} from '@/utils/defaultPromptsArray';

const Feed = () => {
	const [prompts, setPrompts] = useState<IPromptData[]>(defaultArray);
	const [filteredPrompts, setFilteredPrompts] =
		useState<IPromptData[]>(defaultArray);

	const [searchData, setSearchData] = useState('');
	const defferedValue: string | number = useDeferredValue(searchData);

	useEffect(() => {
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
			const url = new URL('../api/prompt', 'http://localhost:3000');
			const response = await fetch(url);

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
	handleTagClick: (text: string) => any;
}) {
	return (
		<div className='prompt_layout'>
			{promptArray?.map(({creator, _id, prompt, tag}) => {
				return (
					<PromtCard
						key={_id}
						promptID={_id}
						image={creator.image}
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
