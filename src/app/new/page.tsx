import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Avatar from '@/components/ui/Avatar';
import { redirect } from 'next/navigation';
import CreatePost from '@/components/ui/CreatePost';
import { Metadata } from 'next';
import NewPost from '@/components/ui/NewPost';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post'
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const { image, username } = session?.user;

  return <NewPost user={session.user} />;
}
