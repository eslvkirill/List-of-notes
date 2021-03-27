import React from "react";
import Button from "../../UiItems/Button/Button.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./NotesCard.scss";

const NotesCard = (props) => (
  <TransitionGroup className="notes-list__wrapper" component={"section"}>
    {props.notes.map((note, index) => (
      <CSSTransition
        key={note.id}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        classNames="note"
      >
        <article
          key={index}
          style={{
            backgroundColor: note.color,
          }}
          className={`notes-list__notes-card notes-card`}
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
      </CSSTransition>
    ))}
  </TransitionGroup>
);
export default NotesCard;
