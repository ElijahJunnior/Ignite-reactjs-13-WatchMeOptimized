import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export type Genre = {
  id: number,
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family',
  title: string
}

type GenreContextData = { 
  genres: Genre[], 
  activeGenreID: number, 
  setActiveGenreID: (id: number) => void 
};

type GenreContextProps = {
  children: ReactNode
}

export const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({children} : GenreContextProps) {
   
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenreID, setActiveGenreID] = useState(1);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  const data = { 
    genres, 
    activeGenreID, 
    setActiveGenreID 
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