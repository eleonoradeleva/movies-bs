import React, { useState, useEffect, useContext } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [movie, setMovie] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie) {
      showAlert(true, "danger", "please enter value");
    } else if (movie && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: movie };
          }
          return item;
        })
      );
      setMovie("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "movie changed");
    } else {
      showAlert(true, "success", "movie added to the list");
      const newMovie = { id: new Date().getTime().toString(), title: movie };
      setList([...list, newMovie]);
      setMovie("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeMovie = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editMovie = (id) => {
    const specificMovie = list.find((movie) => movie.id === id);
    setIsEditing(true);
    setEditId(id);
    setMovie(specificMovie.title);
  };

  function getMovies(searchText) {
    let output = "";
    for (var i = 0; i < list.length; i++) {
      if (searchText === list[i].title) {
        document.getElementById("found").innerHTML =
          list[i].title + " is in the list of Movies!";
        showAlert(true, "success", "film is found");
      }
    }
    document.getElementById("searchText").value = "";
  }
  return (
    <section className="section-center">
      <form
        id="searchForm"
        onSubmit={(e) => {
          e.preventDefault();
          let searchText = document.getElementById("searchText").value;
          getMovies(searchText);
        }}
      >
        <label htmlFor="movie"> Search your favorite movie</label>
        <input type="text" className="form-control" id="searchText" />
        <div id="found" className="row"></div>
      </form>
      <form action="movie-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className="title">Movie</h3>

        <div className="form-control">
          <input
            type="text"
            className="movie"
            placeholder="add film here"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "create"}
          </button>
        </div>
      </form>
      <div className="movie-container">
        <List items={list} removeMovie={removeMovie} editMovie={editMovie} />
      </div>
    </section>
  );
}

export default App;
