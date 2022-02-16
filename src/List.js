import React from "react";

const List = ({ items, removeMovie, editMovie }) => {
  return (
    <div className="movie-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="movie-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editMovie(id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeMovie(id)}
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
