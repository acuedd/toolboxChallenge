import { useEffect, useState } from 'react'
import './App.css';
import Layout from './Layout/Layout';

function App() {
  const [reviews, setReviews] = useState([])  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then((data)=>{
        setReviews(data)
        setLoading(false)
      })  
  }, [])

  console.log(loading,"loading")
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Test App Toolbox</h1>
          {loading ? <div>Loading..</div> :
          reviews && reviews.map(item => (            
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
