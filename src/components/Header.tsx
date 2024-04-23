'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '../app/loading';
import { Button } from '@mui/material';

const Header = () => {
  const { status, data: session } = useSession();
  console.log(status, session);

  const isAuthenticated = status === 'authenticated' && session?.user;

  return (
    <header className="bg-slate-900 sticky top-0 z-50 flex w-full flex-row items-center gap-4 py-2">
      <Link href="/" className="ml-4 flex items-center justify-center gap-3">
        <Image
          className="fill-primary-500"
          src="/logo.svg"
          alt="Logo"
          width={24}
          height={24}
        ></Image>
        <span>Home</span>
      </Link>
      <div className="ml-auto mr-5">
        {status === 'loading' ? (
          <Loading />
        ) : status === 'authenticated' && isAuthenticated ? (
          <Button variant="outlined" onClick={() => signOut()}>
            <Image
              alt={session?.user?.name ?? ''}
              src={session?.user?.image ?? ''}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            Sign Out
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => signIn('google')}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
