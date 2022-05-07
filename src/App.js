import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

const App = () => {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (fetching) {
      console.log("fetching")
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(response => {
          setPhotos([...photos, ...response.data])
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(response.headers['x-total-count'])
        })
        .finally(() => {
          setFetching(false)
        })
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [totalCount])

  const scrollHandler = (e) => {
    if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && (photos.length < totalCount)) {
      console.log("Scroll")
      setFetching(true)
    }
  }

  return (
    <div className={"app"}>
      {photos.map(photo => {
        return (<div className="photo" key={photo.id}>
          <div className="title">{photo.id}. {photo.title}</div>
          <img src={photo.url} alt="" />
        </div>)
      })}
    </div>
  )
}

export default App