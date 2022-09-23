import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../app/usersSlice'

export const Users = () => {
  const dispatch = useDispatch()
  const { results, loading, error } = useSelector((state) => state.users)
  
  const [selected, setSelected] = useState()
  const [index, setIndex] = useState(0);
  const [disMovies, setDisMovies] = useState([]);
  const [dataApi, setDataApi]= useState('');
  let displayList=[];
  const getListOfMovies = (results, index) => {
    let arrMovieLinks = [];
    // let moName= [];
    // const fetchData = async (url) => {
    //   try {
    //     const res = await axios.get(url)
    //     setDataApi(res.data.title);
    //     console.log('retreview movie',res.data.title)
    //   }catch(err){
    //     console.error(err);
    //   }
    // }
    console.log("--->",results, index)
    if(results[index]){
      results[index]["films"].map(result => {
        arrMovieLinks.push(result)
        return
      })
    }
    
    // arrMovieLinks.map((ele)=>{
    //   console.log("😎jklsdfljlll-----", dataApi);
    //   moName.push(fetchData(ele));
    // })
    return arrMovieLinks;
  }
  
 
  
  useEffect(() => {
    dispatch(getUsers())
    
  }, [dispatch])
  
  useEffect(()=>{
    if(results && index){
      getListOfMovies(results, index);
      displayList = getListOfMovies(results, index);
      console.log('testing',displayList)
    }
  },[index])
  
  const handleChange = (e) =>{
    setIndex(e.target.value)
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
      <div>
        <select onChange={(e)=>handleChange(e)}>
          {results.map((items,i)=>{
            return <option key={i} value={i}>{items.name}</option>
          })}
        </select>
        <div>
          checking
          <br/>
          {displayList ? displayList.map((ele)=>{return <p>"dls lsjd lksj "</p>}): "some text"}
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