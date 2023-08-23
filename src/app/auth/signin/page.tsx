'use client';
import ColorButton from '@/components/ui/ColorButton';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  return (
    <div className="h-screen text-center pt-24">
      <ColorButton
        text="Sign In with Google"
        size="lg"
        onClick={() =>
          signIn('google', {
            callbackUrl: searchParams?.get('callbackUrl') || '/'
          })
        }
      />
    </div>
  );
}
