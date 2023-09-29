type AvatarSize = 'xlarge' | 'large' | 'medium' | 'small';
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
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

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const mapSizeToStyle: Record<AvatarSize, string> = {
    small: 'w-9 h-9',
    medium: 'w-11 h-11',
    large: 'w-[68px] h-[68px]',
    xlarge: 'w-[100px] h-[100px]'
  };
  const sizeStyle = mapSizeToStyle[size];
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: AvatarSize): string {
  const mapSizeToStyle: Record<AvatarSize, string> = {
    small: 'w-[34px] h-[34px] p-[0.1rem]',
    medium: 'w-[42px] h-[42px] p-[0.1rem]',
    large: 'w-16 h-16 p-[0.2rem]',
    xlarge: 'w-24 h-24 p-[0.2rem]'
  };
  return mapSizeToStyle[size];
}
