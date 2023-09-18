import { IoClose } from 'react-icons/io5';

export default function CloseIcon({ color }: { color?: string }) {
  return <IoClose className="w-7 h-7" color={color} />;
}
