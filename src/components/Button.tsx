import { Icon } from './Icon';

import { ButtonHTMLAttributes, memo } from 'react';
import '../styles/button.scss';

// extends ButtonHTMLAttributes<HTMLButtonElement>

interface ButtonProps  {
  title: string;
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  selected: boolean;
  onClick: () => void;
}

 function ButtonComponent({ iconName, title, selected, onClick }: ButtonProps) {
  return (
    <button 
      type="button" {...(selected && { className: 'selected' })}
      onClick={onClick}
      // {...rest}
    >
      <Icon name={iconName} color={selected ? '#FAE800' : '#FBFBFB'} />
      {title}
    </button>
  );
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps)
})