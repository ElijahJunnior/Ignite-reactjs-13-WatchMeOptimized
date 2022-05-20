import { Icon } from './Icon';
import { memo, useCallback } from 'react';
import '../styles/button.scss';
import { useGenre } from '../contexts/GenreContext';

type ButtonProps = {
  id: number, 
  title: string, 
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family', 
  selected: boolean;
}

function ButtonComponent({ id, iconName, title,  selected }: ButtonProps) {  
  
  const { setActiveGenreID } = useGenre();

  const onClick = useCallback(() => { 
    setActiveGenreID(id);
  }, [])
  
  return (
    <button 
      type="button" {...(selected && { className: 'selected' })}
      onClick={onClick}
    >
      <Icon 
        name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} 
      />
        {title}
    </button>
  );
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.title === nextProps.title &&
    prevProps.iconName === nextProps.iconName &&
    prevProps.selected === nextProps.selected
  ) 
})