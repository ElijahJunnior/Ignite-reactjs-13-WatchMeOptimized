import { useCallback, useEffect, useMemo, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useGenre } from './contexts/GenreContext';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  
  // const [activeGenre, setactiveGenre] = useState(1);
  // const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  // const { activeGenreData, movies } = useGenre()

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar />
      <Content />
    </div>
  )
}