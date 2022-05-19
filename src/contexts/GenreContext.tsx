import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type Genre = {
  id: number,
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family',
  title: string
}

type Movie = {
  imdbID: string, 
  Title: string, 
  Poster: string, 
  Ratings: Array<{
    Source: string, 
    Value: string, 
  }>, 
  Runtime: string
}

type GenreContextData = { 
  genres: Genre[], 
  activeGenreID: number, 
  setActiveGenre: (id: number) => void,  
  activeGenreData: Genre, 
  movies: Movie[] 
};

type GenreContextProps = {
  children: ReactNode
}

export const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({children} : GenreContextProps) {
   
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenreID, setActiveGenre] = useState(1);
  const [activeGenreData, setActiveGenreData] = useState({} as Genre);
  const [movies, setMovies] = useState<Movie[]>([]);

  // elias_fazer - adicionar useMemo a essa consulta 
  useEffect(() => {
    
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });

  }, []);

  // elias_fazer - adicionar useMemo a essa consulta 
  useEffect(() => {
    
    api.get<Movie[]>(`movies/?Genre_id=${activeGenreID}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${activeGenreID}`).then(response => {
      setActiveGenreData(response.data);
    });
    
  }, [activeGenreID]);
  
  // const setActiveGenre = useCallback((genreID: number) => { 
  //   setActiveGenreID(genreID);
  // }, []);

  const data = { 
    genres, 
    activeGenreID, 
    setActiveGenre, 
    activeGenreData, 
    movies
  }

  return (
    <GenreContext.Provider value={data}>
      {children}
    </GenreContext.Provider>
  )

}

export function useGenre() {
  return useContext(GenreContext)
}