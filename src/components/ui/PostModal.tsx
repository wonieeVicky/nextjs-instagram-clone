import CloseIcon from './icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          // 외부 섹션 태그를 다시 클릭했을 경우 모달을 닫는다.
          onClose();
        }
      }}
    >
      <button onClick={onClose} className="fixed top-0 right-0 p-8 text-white">
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
