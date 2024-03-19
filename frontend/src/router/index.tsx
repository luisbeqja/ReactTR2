import { createBrowserRouter } from 'react-router-dom';

import HomeView from '../views/HomeView';
import AddTranslationView from '../views/AddTranslationView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/add-translation/:id',
    element: <AddTranslationView />,
  },
]);
