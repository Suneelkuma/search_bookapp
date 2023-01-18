import React, { useState } from "react";
import axios from "axios";
export default function Book() {
  const [books, setBooks] = useState("")
  const [result, setResult] = useState([])
  const [apikey, setApikey] = useState("AIzaSyDZ8Bmy4MW0FsAKsNI87gduIZQywIfNL9E");
  function handleChange(e) {
    const books = e.target.value;
    setBooks(books);
  }
  function handleSubmit(e) {
    e.preventDefault();

    console.log(books);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          books +
          "&key=" +
          apikey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data);
        console.log(data.data.items);
        console.log(typeof data.data.items[0].volumeInfo.imageLinks.thumbnail);
        console.log(`hello ${data.data.items[0].volumeInfo.imageLinks.thumbnail}`);
        setResult(data.data.items);
      });
  }
  return (
    <>
      <div className="container">
        <h1>Book Search App</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <input
              type="text"
              onChange={handleChange}
              className="form-control mt-10"
              placeholder="search for books"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-primary ">
            Search
          </button>
        </form>
        {
          result.map(books=>(
            <a target="_blank" href={books?.volumeInfo.previewLink}>
            <img src={books.volumeInfo?.imageLinks?.thumbnail} />
            </a>
          ))
        }
      </div>
    </>
  );
}
