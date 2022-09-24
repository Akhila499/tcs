import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../app/usersSlice'

export const Users = () => {
  const dispatch = useDispatch()
  const { results, loading, error } = useSelector((state) => state.users)
  console.log('ressults', results)

  const [index, setIndex] = useState(0);
  const [arrayOfMovieLinks, setArrayOfMovieLinks] = useState([])
  const [data, setData] = useState();
  const [films, setFilms] = useState();
  const [movieNames, setMovieNames] = useState();
  const [lastMovieActed, setLastMovieActed] = useState();
  
  useEffect(() => {
    getFilmsData();
  },[index])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const getListOfMovies = (results, index) => {
    let arrMovieLinks = [];
    console.log("--->",results, index)
    if(results[index]){
      results[index]["films"].map(result => {
        arrMovieLinks.push(result)
      })
    }
    return arrMovieLinks;
  }


  const getFilmsData = () => {
    axios.get(`https://swapi.dev/api/films`)
    .then(res => {
      const allFilms = res.data.results;
      setFilms(allFilms);
    })
    .catch((err) => {
      console.log(`Errors`, err);
    })
  }

  const getMovieTitles = (Links) => {
    let catchtest = [];
    let lastMovie = {};
    for(let i=0; i<Links.length; i++){
      for(let j=0; j<Links.length; j++){
        if(Links[i] === films[j]['url']){
          catchtest.push(films[j]['title']);
          lastMovie[films[j]['title']]=films[j]["release_date"]
          break
        }
      }
    }
    let entries = Object.entries(lastMovie);    
    let sorted = entries.sort((b, a) => b[1] - a[1]);
    let lastMovieActed = sorted[sorted.length - 1];
    return {catchtest, lastMovieActed};
  }

  const handleChange = (e) => {
    setIndex(e.target.value);
    let Links = getListOfMovies(results, e.target.value);
    setArrayOfMovieLinks(Links);
    let {catchtest, lastMovieActed} = getMovieTitles(Links);
    setMovieNames(catchtest);
    setLastMovieActed(lastMovieActed);
  }

  let content
    
  if (loading === 'pending') {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (loading === 'idle') {
    content = (
      <div className='select-class'>
        <select value={index || " "} onChange={(e)=>handleChange(e)}>
          <option defaultValue>
            {'Please Select'}
          </option>
          {results.map((items,i)=>{
            return <option key={i} value={i}>{items.name}</option>
          })}
        </select>
        <div className='movie-list-css'>
          {movieNames ? <h6>List of Movies acted by above selected character</h6> : ""}
          {movieNames ?  movieNames.map((item,i) => 
            <div key={i}>{item}</div>
          ) : "Please select the Charactors to view List of Movies" }
        </div>
        <div className='movie-list-css'>
          <h6>Last Movie Acted - Name and Date</h6>
          {lastMovieActed ? lastMovieActed[0] + " - " + lastMovieActed[1] : " "}
        </div>
      </div>
    )
  }

  if (error !== null) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return <div className='total'><p>Please select any character from below:</p>{content}</div>
}

export default Users