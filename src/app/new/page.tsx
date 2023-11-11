import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import NewPost from '@/components/ui/NewPost';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post'
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return <NewPost user={session.user} />;
}
