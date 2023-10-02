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
        className={`bg-white object-cover rounded-full ${
          getImageSizeStyle(size).image
        }`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  const mapSizeToStyle: Record<AvatarSize, ImageSizeStyle> = {
    small: {
      container: 'w-9 h-9',
      image: 'w-[34px] h-[34px] p-[0.1rem]'
    },
    medium: {
      container: 'w-11 h-11',
      image: 'w-[42px] h-[42px] p-[0.1rem]'
    },
    large: {
      container: 'w-[68px] h-[68px]',
      image: 'w-16 h-16 p-[0.2rem]'
    },
    xlarge: {
      container: 'w-[142px] h-[142px]',
      image: 'w-[138px] h-[138px] p-[0.3rem]'
    }
  };

  return mapSizeToStyle[size];
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const { container } = getImageSizeStyle(size);

  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};
