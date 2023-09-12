type Props = {
  image?: string | null;
  size?: 'small' | 'normal' | 'medium';
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  highlight = false
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`bg-white object-cover rounded-full ${getImageSizeStyle(
          size
        )}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const mapSizeToStyle: Record<string, string> = {
    small: 'w-9 h-9',
    normal: 'w-[68px] h-[68px]',
    medium: 'w-[45px] h-[45px]'
  };
  const sizeStyle = mapSizeToStyle[size];
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: 'small' | 'normal' | 'medium'): string {
  const mapSizeToStyle: Record<'small' | 'normal' | 'medium', string> = {
    small: 'w-[34px] h-[34px] p-[0.1rem]',
    normal: 'w-16 h-16 p-[0.2rem]',
    medium: 'p-[0.1rem] w-[41px] h-[41px]'
  };
  return mapSizeToStyle[size];
}
