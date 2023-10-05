import { MdBookmarkBorder } from 'react-icons/md';

type Props = {
  className?: string;
};

export default function BookmarkIcon({ className }: Props) {
  return <MdBookmarkBorder className={className || 'w-6 h-6'} />;
}
