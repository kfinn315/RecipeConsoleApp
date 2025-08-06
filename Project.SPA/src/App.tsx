import './App.css'
import Menu from './Components/Menu'
import { useState } from 'react';
import { Welcome } from './Components/Pages/Welcome';

function App() {
  const [content, setContent] = useState<JSX.Element | undefined>(<Welcome />);
  function handleShow(element: JSX.Element) {
    setContent(element);
  }
  return (
    <div className={"container"}>
      <div className='heading'>
        <h1>
          Recipe Console App
        </h1>
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
