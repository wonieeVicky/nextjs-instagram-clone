// import { getPosts } from '@/service/sanity';
import UserWidget from '@/components/layout/UserWidget';

export default async function Home() {
  // const posts = await getPosts();
  return (
    <div className="w-full flex p-5">
      <div className="flex-1">
        <div>FollowingBar</div>
        <div>PostList</div>
      </div>
      <UserWidget />
    </div>
  );
}
