import './App.css'
import Menu from './Components/Menu'
import { useState } from 'react';
import { RecipesPage } from './Components/Pages/Recipes/RecipesPage';

function App() {
  const [content, setContent] = useState<JSX.Element | undefined>(<RecipesPage />);
  function handleShow(element: JSX.Element) {
    setContent(element);
  }
  return (
    <div className={"container"}>
      <div className='heading'>
        <h1>
          Recipe App
        </h1>
        <h2>Welcome!</h2>
      </div>
      <div className='menu'>
        <Menu show={handleShow} />
      </div>
      <div className='content'>
        <main>
          {content}
        </main>
      </div>
    </div>
  )
}

export default App
