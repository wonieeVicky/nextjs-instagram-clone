﻿type Props = {
  image?: string | null;
  size?: 'sm' | 'md';
  border?: boolean;
};

export default function Avatar({ image, size = 'sm', border = true }: Props) {
  return (
    <div
      className={`rounded-full ${
        border && 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
      } ${size === 'sm' ? 'w-9 h-9' : 'w-[3.25rem] h-[3.25rem]'}`}
    >
      <img
        className={`rounded-full ${border && 'p-[0.1rem]'}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
