import {IProfileProps, IPromptData} from '@/types/typescriptTypes';
import PromtCard from './PromtCard';

function Profile({
	type,
	desc,
	promptArr,
	handleEditPrompt,
	handleDeletePrompt,
}: IProfileProps) {
	return (
		<section className='w-full'>
			<h5 className='head_text text-left'>
				<span className='blue_gradient'>{type} Profile</span>
			</h5>
			<p className='dsc mt-11 text-left'>{desc}</p>

			<div className='prompt_layout mt-8'>
				{promptArr?.map(({creator, _id, prompt, tag}) => {
					return (
						<PromtCard
							key={_id}
							promptID={_id}
							image={creator.image}
							tag={tag}
							prompt={prompt}
							creator={creator}
							handleEditPrompt={(id: string) => handleEditPrompt(id)}
							handleDeletePrompt={handleDeletePrompt}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Profile;
