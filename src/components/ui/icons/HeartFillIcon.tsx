import { HiHeart } from 'react-icons/hi';

type Props = {
  className?: string;
};

export default function HeartFillIcon({ className }: Props) {
  return <HiHeart className={className || 'w-6 h-6 fill-red-500'} />;
}
