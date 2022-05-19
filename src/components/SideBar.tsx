import { memo, useCallback } from "react";
import { useGenre } from "../contexts/GenreContext";
import { Button } from "./Button";

function SideBarComponent () {
  
  const { genres, activeGenreID } = useGenre();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={genre.id}
            title={genre.title}
            iconName={genre.name}
            selected={genre.id === activeGenreID}
          />
        ))}
      </div>
    </nav>
  )
}

export const SideBar = memo(SideBarComponent);