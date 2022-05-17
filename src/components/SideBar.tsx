import { useGenre } from "../contexts/genreContext";
import { Button } from "./Button";

interface SideBarProps {
  buttonClickCallback: (args: any) => void;
}

export function SideBar( { buttonClickCallback }: SideBarProps) {
  
  const { genres, activeGenre } = useGenre();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={activeGenre === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}