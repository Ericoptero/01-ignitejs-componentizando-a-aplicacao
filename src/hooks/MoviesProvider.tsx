import { createContext, useEffect, useState } from "react";

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextProps {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
}

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextProps);

export function MoviesProvider({children}: MoviesProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{selectedGenre, movies, genres, selectedGenreId, setSelectedGenreId}}>
      {children}
    </MoviesContext.Provider>
  )
}