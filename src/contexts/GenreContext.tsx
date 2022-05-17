import { createContext, ReactNode, useContext, useState } from "react";

type Genre = {
  id: number,
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family',
  title: string
}

type GenreContextData = { 
  activeGenre: number, 
  setActiveGenre: (id: number) => void,  
  genres: Genre[],
  setGenres: (genres: Genre[]) => void 
};

type GenreContextProps = {
  children: ReactNode
}

export const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({children} : GenreContextProps) {
   
  const [activeGenre, setActiveGenre] = useState(1);
  const [genres, setGenres] = useState([] as Genre[]);

  const data = { 
    activeGenre, 
    setActiveGenre, 
    genres, 
    setGenres
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