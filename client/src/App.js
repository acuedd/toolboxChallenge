import { useEffect, useState } from 'react'
import './App.css';
import Layout from './Layout/Layout';

function App() {
  const [reviews, setReviews] = useState([])  
  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Test App Toolbox</h1>              
          {reviews && reviews.map(item => (            
            <Layout 
              title={item.file}
              header={item.headers}
              lines={item.lines}
            />            
          ))}
      </header>
    </div>
  );
}

export default App;
