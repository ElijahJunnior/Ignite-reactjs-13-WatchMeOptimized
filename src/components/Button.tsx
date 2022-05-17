import { Icon } from './Icon';

import { ButtonHTMLAttributes, memo } from 'react';
import '../styles/button.scss';
import { useGenre } from '../contexts/GenreContext';

// extends ButtonHTMLAttributes<HTMLButtonElement>

type ButtonProps = {
  id: number, 
  title: string, 
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family', 
  // selected: boolean;
  // onClick: () => void;
}

 function ButtonComponent({ id, iconName, title }: ButtonProps) {
  
  const { activeGenre, setActiveGenre } = useGenre();

  const selected = id === activeGenre
  
  return (
    <button 
      type="button" {...(selected && { className: 'selected' })}
      onClick={() => { setActiveGenre(id)}}
    >
      <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />
      {title}
    </button>
  );
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps)
})