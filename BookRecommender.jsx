import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookRecommender = () => {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  // Fetch top books on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/popular")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle recommend request
  const handleRecommend = () => {
    axios.post("http://localhost:5000/api/recommend", {
      user_input: userInput
    })
    .then((res) => setRecommendations(res.data))
    .catch((err) => alert("Book not found or error occurred"));
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
      <nav className="navbar mb-4" style={{ backgroundColor: "#be76e4" }}>
        <a href="#" className="navbar-brand text-white px-3">My Book Recommender</a>
      </nav>

      <div className="container">
        <h1 className="text-white">Top 50 Books</h1>
        <div className="row">
          {books.map((book, index) => (
            <div className="col-md-3 mt-4" key={index}>
              <div className="card h-100">
                <img className="card-img-top" src={book.image} alt="book" />
                <div className="card-body bg-dark">
                  <p className="text-white">{book.book_name}</p>
                  <h5 className="text-white">{book.author}</h5>
                  <p className="text-white">Votes: {book.votes}</p>
                  <p className="text-white">Rating: {book.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-5 text-white" />

        <h2 className="text-white">Get Recommendations</h2>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Enter a book name..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="btn btn-primary mb-4" onClick={handleRecommend}>
          Recommend
        </button>

        <div className="row">
          {recommendations.map((book, index) => (
            <div className="col-md-3 mt-4" key={index}>
              <div className="card h-100">
                <img className="card-img-top" src={book.image} alt="book" />
                <div className="card-body bg-dark">
                  <p className="text-white">{book.book_name}</p>
                  <h5 className="text-white">{book.author}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookRecommender;
