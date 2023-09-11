import {signIn} from 'next-auth/react';

import {ClientSafeProvider} from '@/auth';

function SignInButton({provider}: {provider: ClientSafeProvider}) {
	return (
		<button
			key={provider.name}
			onClick={() => signIn(provider.id)}
			className='black_btn'
		>
			Sign In
		</button>
	);
}
export default SignInButton;
