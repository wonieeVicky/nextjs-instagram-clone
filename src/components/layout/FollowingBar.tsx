import { User } from '@/model/user';
import { getFollowings } from '@/service/user';
import Avatar from '../ui/Avatar';
import MultiCarousel from '../MultiCarousel';

type Props = {
  user: User;
};

export default async function FollowingBar({ user }: Props) {
  const followings = await getFollowings({ username: user.username });

  if (!followings) {
    return;
  }

  return (
    <div className="border p-5 rounded-md">
      <MultiCarousel>
        {followings.map(({ name, username, email, image }: User) => (
          <div key={username} className="text-center border">
            <Avatar image={image} highlight />
            {username}
          </div>
        ))}
      </MultiCarousel>
    </div>
  );
}
