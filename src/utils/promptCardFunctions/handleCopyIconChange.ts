import {SetStateAction, Dispatch} from 'react';

export function handleCopyIconChange(
	prompt: string,
	setState: Dispatch<SetStateAction<boolean>>
) {
	navigator.clipboard
		.writeText(prompt)
		.then(() => setState(true))
		.catch(() =>
			console.log(
				'Error while copy the tag content to the navigator.clipboard!'
			)
		)
		.finally(() => {
			setTimeout(() => {
				setState(false);
			}, 3000);
		});
}
