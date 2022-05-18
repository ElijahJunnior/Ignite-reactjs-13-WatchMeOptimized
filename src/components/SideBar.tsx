import { memo } from "react";
import { useGenre } from "../contexts/GenreContext";
import { Button } from "./Button";

function SideBarComponent () {
  
  const { genres } = useGenre();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            id={genre.id}
            title={genre.title}
            iconName={genre.name}
          />
        ))}
      </div>

    </nav>
  )
}

export const SideBar = memo(SideBarComponent);