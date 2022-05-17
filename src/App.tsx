import { useCallback, useEffect, useMemo, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { useGenre } from './contexts/genreContext';

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

export function App() {
  
  // const [activeGenre, setactiveGenre] = useState(1);
  // const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  const { setGenres, activeGenre, setActiveGenre } = useGenre()

  // elias_fazer - adicionar useMemo a essa consulta 
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // const genresMemo = useMemo(() => { 
  //   return [...genres]
  // }, [])
  
  // elias_fazer - adicionar useMemo a essa consulta 
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${activeGenre}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${activeGenre}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [activeGenre]);

  // elias_fazer - add callback nessa função
  const handleClickButton = useCallback(
    (id: number) => {
      setActiveGenre(id);
    }, 
  [])  

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        buttonClickCallback={handleClickButton}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
      />
    </div>
  )
}