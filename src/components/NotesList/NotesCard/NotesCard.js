import React from "react";
import Button from "../../UiItems/Button/Button.js";
import "./NotesCard.scss";

const NotesCard = (props) => (
  <section className="notes-list__wrapper">
    {props.notes.map((note, index) => {
      return (
        <article
          key={index}
          style={{
            backgroundColor: note.color,
          }}
          className="notes-list__notes-card notes-card"
          onClick={() => props.editNotesCard(note.id)}
        >
          <h2 className="notes-card__title">{note.title}</h2>
          <p className="notes-card__description">{note.description}</p>
          <Button
            className="notes-card__trash-can"
            onClick={(event) => props.removeNotesCard(event, note.id)}
          >
            🗑
          </Button>
        </article>
      );
    })}
  </section>
);
export default NotesCard;
