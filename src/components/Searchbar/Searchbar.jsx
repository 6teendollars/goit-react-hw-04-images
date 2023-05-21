import React, { useState } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const query = searchInput.toLowerCase().trim();
    if (query) {
      onSubmit(query);
    } else {
      Notiflix.Notify.info('Please enter your request');
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchInput}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
