type Props = {
  children?: React.ReactNode;
};

export default function ColorImage({ children }: Props) {
  return (
    <div className="inline-block overflow-hidden h-10 w-10 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
      {children}
    </div>
  );
}
