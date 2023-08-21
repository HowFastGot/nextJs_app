export function manageTags(tags: string): string[] {
	const tagArray: string[] = tags.split(' ');

	const changedAllStrArray = tagArray.map((tag) => {
		return `${tag}`;
	});

	return changedAllStrArray;
}
