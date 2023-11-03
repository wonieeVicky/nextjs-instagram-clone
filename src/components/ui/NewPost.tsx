'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import UploadIcon from './icons/UploadIcon';
import Button from './Button';
import { ChangeEvent, DragEvent, useState } from 'react';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    // 브라우저에서 파일을 읽지 않도록 기본 동작 취소
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar username={username} image={image ?? ''} />
      <form>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <UploadIcon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          name="text"
          id="input-text"
          required
          placeholder="Write a caption..."
          rows={10}
        ></textarea>
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
