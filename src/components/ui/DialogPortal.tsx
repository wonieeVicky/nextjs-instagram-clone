import { SimplePost } from '@/model/post';
import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';

type Props = {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  post: SimplePost;
};

export default function DialogPortal({
  showDialog,
  setShowDialog,
  post
}: Props) {
  return (
    <>
      {showDialog &&
        createPortal(
          <ModalContent onClose={() => setShowDialog(false)} post={post} />,
          document.getElementById('dialog-root')!
        )}
    </>
  );
}
