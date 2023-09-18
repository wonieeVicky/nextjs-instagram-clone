import { SimplePost } from '@/model/post';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CloseIcon from './icons/CloseIcon';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  post: SimplePost;
};

export default function ModalContent({ onClose, post }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-5xl">
          <div className="border-0 shadow-lg relative flex w-auto h-auto bg-white outline-none focus:outline-none">
            <Image
              src={image}
              className="w-[1000px] object-cover aspect-square cursor-pointer"
              alt={`photo by ${username}`}
              width={500}
              height={500}
            />
            <div className="bg-white min-w-[400px]"></div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-70" />
      <div
        onClick={onClose}
        className="cursor-pointer fixed right-5 top-5 z-50"
      >
        <CloseIcon color="white" />
      </div>
    </>
  );
}
