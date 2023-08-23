type Props = {
  text: string;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
};

export default function ColorButton({ text, onClick, size = 'md' }: Props) {
  return (
    <div className="rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem] inline-block">
      <button
        className={`bg-white rounded-sm px-[0.3rem] hover:opacity-90 transition-opacity ${
          size === 'lg' ? 'text-3xl p-[1rem] px-[1rem]' : 'text-bases'
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
{
  /* <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
  <span className="relative py-1 px-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
    Sign in
  </span>
</button>; */
}
