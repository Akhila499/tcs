import logo from './logo.svg';
import './App.css';
import { useGetAllCharactersQuery, useGetFilmByIdQuery } from './services/post'; 

function App() {
  const responseInfo = useGetAllCharactersQuery();
  const responseInfo1 = useGetFilmByIdQuery(3);

  console.log("response info", responseInfo.data);
  console.log("response info!!!!", responseInfo1.data);
  if(responseInfo.isLoading) return <div>Loading....</div>
  if(responseInfo.isError) return <div>An error occured...{responseInfo.error.error}</div>
  return (
    <div className="App">
      <h1>Hello</h1>
      <select>
        {responseInfo.data.results.map((option, i) => (
          <option key={i} value={option.name}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default App;
