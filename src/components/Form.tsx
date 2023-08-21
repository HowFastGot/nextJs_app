import {IFormProps} from '@/types/typescriptTypes';
import Link from 'next/link';

const Form = ({type, post, setPosts, submitting, handleSubmit}: IFormProps) => {
	return (
		<section className='w-full flex flex-col items-center'>
			<h4 className='text-green-950 head_text text-left text-2xl'>
				<span className='blue_gradient'>{type}</span> prompt!
			</h4>
			<p className='desc max-w-md'>{type} and Share amthing prompts with the word with AI-Powered platforms!</p>

			<form onSubmit={handleSubmit} className='w-full mw-10 max-w-2xl flex flex-col gap-7 glassmorphism'>
				<label>
					<span className='font-roboto font-semibold text-base text-gray-700'>Your AI prompt</span>

					<textarea
						name='prompt'
						value={post.prompt}
						onChange={(e) => setPosts({...post, prompt: e.target.value})}
						placeholder='Write your text prompt here!'
						className='form_textarea'
						required
					></textarea>
				</label>
				<label>
					<span className='font-roboto font-semibold text-base text-gray-700'>
						Tag <span className='font-normal'>(#webdevelopment, #idea, #product)</span>
					</span>

					<textarea
						name='tag'
						value={post.tag}
						onChange={(e) => setPosts({...post, tag: e.target.value})}
						placeholder='#tag'
						className='form_input'
						required
					></textarea>
				</label>
				<div className='flex-end mx-3 mb-5 gap-5 items-center'>
					<button className='black py-1.5 px-5 bg-primary-orange text-white rounded-full text-sm' disabled={submitting}>
						{submitting ? `${type}...` : type}
					</button>
					<Link href='/' className='text-sm text-gray-500'>
						Cancel
					</Link>
				</div>
			</form>
		</section>
	);
};
export default Form;
