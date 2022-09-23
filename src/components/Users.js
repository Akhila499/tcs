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

  let displayList=[];
  
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
  
 
  
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleChange = (e) =>{
    console.log('handlechange', e.target.value)
    setIndex(e.target.value);
    let Links = getListOfMovies(results, e.target.value);
    console.log('@@@@@',Links)
    setArrayOfMovieLinks(Links);
    
  }

  const renderList = arrayOfMovieLinks.map((item,i) => 
                             <div key={i}>{item}</div>
                           );
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
      <div>
        <select value={index || " "} onChange={(e)=>handleChange(e)}>
          <option defaultValue>
            {'Please Select'}
          </option>
          {results.map((items,i)=>{
            return <option key={i} value={i}>{items.name}</option>
          })}
        </select>
        <div>
          checking
          {renderList}
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
  return <div>{content}</div>
}
export default Users