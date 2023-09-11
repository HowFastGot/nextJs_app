'use client';


import {ISession} from '@/types/typescriptTypes';
import {SessionProvider} from 'next-auth/react';

const Provider = ({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: ISession;
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default Provider;
