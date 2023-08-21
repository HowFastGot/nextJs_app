import {NextRequest, NextResponse} from 'next/server';

import {connectToDB} from '@/utils/database';
import Prompt from '@/models/prompt';
import {IPromptModel} from '@/types/typescriptTypes';

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		await connectToDB();

		const {userId, prompt, tag} = await req.json();

		const newPrompt = new Prompt<IPromptModel>({
			creator: userId,
			tag,
			prompt,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), {
			status: 201,
		});
	} catch (error) {
		return new Response('Faild to create a new prompt', {
			status: 500,
		});
	}
}
