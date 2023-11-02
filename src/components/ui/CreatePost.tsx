'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import UploadIcon from './icons/UploadIcon';

export default function CreatePost() {
  const [dropzoneImage, setDropzoneImage] = useState(null);
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setDropzoneImage(reader.result);
  };

  useEffect(() => {
    if (dropzoneImage) {
      // show image in dropzone
      const dropzoneFile = document.getElementById(
        'dropzone-file'
      ) as HTMLElement;
      const dropzoneTitle = document.getElementById(
        'dropzone-title'
      ) as HTMLElement;
      const dropzone = dropzoneFile.parentElement as HTMLElement;

      const image = new Image();
      image.src = dropzoneImage;
      image.onload = () => {
        dropzoneTitle.classList.add('hidden');
        dropzoneFile.classList.add('hidden');
        dropzone.style.backgroundImage = `url(${dropzoneImage})`;
        dropzone.style.backgroundSize = 'cover';
        dropzone.style.backgroundPosition = 'center';
      };
    }
  }, [dropzoneImage]);
  return (
    <>
      <section className="w-8/12 m-auto">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
            <div
              className="flex flex-col items-center justify-center pt-5 pb-6"
              id="dropzone-title"
            >
              <UploadIcon />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={uploadImage}
            />
          </label>
        </div>
      </section>
      <section className="w-8/12 m-auto">
        <div className="flex items-center justify-center w-full">
          <textarea className="flex flex-col items-center justify-center w-full h-64 border-1 border-gray-300 mt-2 rounded-lg cursor-pointer bg-gray-50" />
        </div>
      </section>
      <section className="w-8/12 m-auto mt-3">
        <Button disabled={false} text="Publish" onClick={() => {}} block />
      </section>
    </>
  );
}
