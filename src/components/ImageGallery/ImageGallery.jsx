import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
import React, { useEffect, useState } from 'react';

export const ImageGallery = ({ images }) => {
  const [largeImage, setLargeImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClickImage = (e) => {
    setLargeImage(e.target.dataset.image);
    setIsOpen(true);
  };

  const handleClickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      setIsOpen(false);
    }
  };

  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webFormat={webformatURL}
          largeFormat={largeImageURL}
          tags={tags}
          handleClick={handleClickImage}
        />
      ))}
      {isOpen && (
        <Modal
          largeImageURL={largeImage}
          onClick={handleClickBackdrop}
        />
      )}
    </ul>
  );
};







