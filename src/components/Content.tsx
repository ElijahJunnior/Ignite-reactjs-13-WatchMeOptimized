import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { Genre, useGenre } from '../contexts/GenreContext';
import { api } from "../services/api";

export type Movie = {
  imdbID: string, 
  Title: string, 
  Poster: string, 
  Ratings: Array<{
    Source: string, 
    Value: string, 
  }>, 
  Runtime:
   string
}

export function Content() {
  
  const [activeGenreData, setActiveGenreData] = useState({} as Genre);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { activeGenreID } = useGenre();

  useEffect(() => {
  
    api.get<Movie[]>(`movies/?Genre_id=${activeGenreID}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${activeGenreID}`).then(response => {
      setActiveGenreData(response.data);
    });
    
  }, [activeGenreID]);
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {activeGenreData.title}</span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )

}