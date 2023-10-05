import { MdBookmark } from 'react-icons/md';

type Props = {
  className?: string;
};

export default function BookmarkFillIcon({ className }: Props) {
  return <MdBookmark className={className || 'w-6 h-6'} />;
}
