import React from 'react'
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import { useVisualMode } from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  //modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //function saves name and interviewer and updates state state
  //displays error if no name / interviewer provided
  //displays error if save not successful
  const save = (name, interviewer, appointmentID) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(interviewer, interview.student, appointmentID, mode === EDIT ? "no update" : null)
        .then(res => {
          transition(SHOW, true);
        })
        .catch(error => {
          transition(ERROR_SAVE, true);
        });
    }
  }

  //removes appointment and updates state
  //transitions to mode EMPTY on completion
  const del = (id) => {
    transition(DELETING, true);
    props.deleteInterview(id)
      .then(res => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      })
  }

  function edit() {
    transition(EDIT);
  }


  return (

    <article className="appointment">
      <Header time={props.time} />

      {/* all mode transitions */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE, true)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm message="Are you sure you would like to delete?"
          onConfirm={() => del(props.id)}
          onCancel={() => transition(SHOW)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interview={props.interview}
          interviewers={props.interviewers}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === EDIT && (
        <Form
          id={props.id}
          interviewers={props.interviewers}
          interview={props.interview}
          value={props.interview.student}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          id={props.id}
          interview={props.interview}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not create appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment"
          onClose={back}
        />
      )}


    </article>

  );
}