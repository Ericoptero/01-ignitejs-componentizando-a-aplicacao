import { useContext, useState } from 'react';

import { MoviesContext } from '../hooks/MoviesProvider';
import { Button } from './Button';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, selectedGenreId, setSelectedGenreId } = useContext(MoviesContext);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}