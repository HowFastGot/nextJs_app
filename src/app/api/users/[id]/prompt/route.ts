import {NextRequest, NextResponse} from 'next/server';

import Prompt from '@/models/prompt';
import User from '@/models/user';
import {connectToDB} from '@/utils/database';

export const GET = async (req: NextRequest, {params}: any) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({creator: params.id}).populate('creator');
		const user = await User.findById(params.id);

		return new Response(JSON.stringify({prompts, user}), {status: 200});
	} catch (error) {
		return new Response('Failed to fetch all prompts', {status: 500});
	}
};
