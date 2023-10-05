import { HiOutlineHeart } from 'react-icons/hi';

type Props = {
  className?: string;
};

export default function HeartIcon({ className }: Props) {
  return <HiOutlineHeart className={className || 'w-6 h-6'} />;
}
