import {Dispatch, FormEvent, SetStateAction} from 'react';

export interface ICreatedPosts {
	prompt: string;
	tag: string;
}

export interface IFormProps {
	type: 'Create' | 'Edit';
	post: ICreatedPosts;
	setPosts: Dispatch<SetStateAction<ICreatedPosts>>;
	submitting: boolean;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface IPromptModel {
	creator: number;
	tag: string;
	prompt: string;
}

export interface IPromptCreator {
	email: string;
	image: string;
	username: string;
	_id: string;
}
export interface IPromptData {
	_id: string;
	creator: IPromptCreator;
	prompt: string;
	tag: string;
}

export interface IProfileProps {
	type: string;
	desc: string;
	promptArr: IPromptData[];
	handleEditPrompt: (id: string) => {};
	handleDeletePrompt: (id: string) => {};
}

export interface IPromptCardInterface extends Partial<IProfileProps> {
	image: string;
	promptID: string;
	tag: string;
	prompt: string;
	creator: IPromptCreator;
	handleTagClick: (id: string) => any;
}