import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div id="App">
        <RouterProvider router={router} />
      </div>
    </RecoilRoot>
  );
}

export default App;
