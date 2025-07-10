import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BookRecommender = ({ books }) => {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: "#be76e4" }}>
        <a className="navbar-brand text-white px-3">My Book Recommender</a>
        <ul className="nav navbar-nav d-flex flex-row gap-3 px-3">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/recommend">Recommend</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Book Grid */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4">
            <h1 className="text-white" style={{ fontSize: "50px" }}>
              Top 50 Books
            </h1>
          </div>

          {books.map((book, i) => (
            <div className="col-md-3" style={{ marginTop: "50px" }} key={i}>
              <div className="card h-100">
                <img className="card-img-top" src={book.image} alt="book-cover" />
                <div className="card-body bg-dark">
                  <p className="text-white">{book.book_name}</p>
                  <h4 className="text-white">{book.author}</h4>
                  <h4 className="text-white">Votes - {book.votes}</h4>
                  <h4 className="text-white">Rating - {book.rating}</h4>
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
