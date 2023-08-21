import {NextRequest} from 'next/server';

import Prompt from '@/models/prompt';
import {connectToDB} from '@/utils/database';

interface IParams {
	params: {id: string};
}

export const GET = async (req: NextRequest, {params}: IParams) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id);

		if (!prompt) {
			return new Response('Prompt not found!', {status: 404});
		}

		return new Response(JSON.stringify(prompt), {status: 200});
	} catch (error) {
		return new Response('Failed to fetch your prompt', {status: 500});
	}
};

export const PATCH = async (req: NextRequest, {params}: IParams) => {
	const {
		prompt,
		tag,
	}: {
		prompt: string;
		tag: string;
	} = await req.json();

	try {
		await connectToDB();

		const exisitingPrompt = await Prompt.findById(params.id);

		if (!exisitingPrompt) {
			return new Response('Existing prompt not found!', {status: 404});
		}

		exisitingPrompt.prompt = prompt;
		exisitingPrompt.tag = tag;

		exisitingPrompt.save();

		return new Response(JSON.stringify(exisitingPrompt), {status: 200});
	} catch (error) {
		return new Response('Failed to update your prompt', {status: 500});
	}
};

export const DELETE = async (req: NextRequest, {params}: IParams) => {
	try {
		await connectToDB();

		await Prompt.findByIdAndRemove(params.id);

		return new Response('The prompt was deleted successfully!', {status: 200});
	} catch (error) {
		return new Response('Failed to remove your prompt', {status: 500});
	}
};
