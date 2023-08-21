import Image from 'next/image';
import Link from 'next/link';

export function UserImage({
	userImageSrc,
	userId = null,
}: {
	userImageSrc: string;
	userId?: string | null;
}) {
	return (
		<Link
			href={userId ? `/profile/${userId}` : '/profile'}
			className='rounded-full'
		>
			<Image
				src={userImageSrc}
				alt='user avatar image'
				width='37'
				height='37'
				className='rounded-full object-contain'
			></Image>
		</Link>
	);
}
export default UserImage;
