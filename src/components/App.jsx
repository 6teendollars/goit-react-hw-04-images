  
import React, { useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import * as Scroll from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

const scroll = Scroll.animateScroll;

const API_KEY = '34653415-e76f837a15d16f03129de4a6a';
const BASE_URL = 'https://pixabay.com/api/?';
const searchParams = 'image_type=photo&orientation=horizontal&per_page=12';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (query) => {
    if (query === searchQuery) {
      return;
    }
    const searchUrl = `${BASE_URL}q=${query}&page=1&key=${API_KEY}&${searchParams}`;
    try {
      setIsLoading(true);
      scroll.scrollToTop();
      const response = await axios.get(searchUrl);
      const { hits } = response.data;
      if (hits.length === 0) {
        Notiflix.Notify.info('Images not found. Please change your request');
        return;
      }

      setSearchQuery(query);
      setImages(response.data.hits);
      setPage(1);
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    const nextPage = page + 1;
    const searchUrl = `${BASE_URL}q=${searchQuery}&page=${nextPage}&key=${API_KEY}&${searchParams}`;
    try {
      setIsLoading(true);
      const response = await axios.get(searchUrl);
      const { hits } = response.data;
      scroll.scrollMore(500);
      if (hits.length === 0) {
        Notiflix.Notify.info('The images of your request are over');
        return;
      }
      setImages((prevImages) => [...prevImages, ...hits]);
      setPage(nextPage);
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {images.length !== 0 && <Button handleClick={handleClick} />}
    </>
  );
};
