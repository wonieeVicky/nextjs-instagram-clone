'use client';

import { ProfileUser } from '@/model/user';
import Button from './Button';
import useMe from '@/hooks/me';

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username, image } = user;
  const { user: loggedInUser, setFollow } = useMe();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';
  const updateFollow = () =>
    setFollow(username, image, following ? true : false);

  return (
    <>
      {showButton && (
        <Button text={text} onClick={updateFollow} red={text === 'Unfollow'} />
      )}
    </>
  );
}
