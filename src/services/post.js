import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath:'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),

  endpoints:(builder)=>({

    getAllCharacters: builder.query({
      query: ()=>({
        url: 'people',
        method: 'GET'
      })
    }),

    getFilmById: builder.query({
      query: (id) => {
        console.log("ID", id)
        return {
          url: `films/${id}`,
          method: 'GET'
        }
      }
    })
  })
})



export const { useGetAllCharactersQuery, useGetFilmByIdQuery } = postApi

