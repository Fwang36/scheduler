import React from 'react'
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import { useVisualMode } from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
// import { getInterviewersForDay } from 'helpers/selectors';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  const save = (name, interviewer, appointmentID) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(interviewer, interview.student, appointmentID).then((res => {
      transition(SHOW)
    }))
  }

  const del = (id) => {
    transition(DELETING)
    props.deleteInterview(id)
      .then((res) => {
        console.log("success")
        transition(EMPTY)
      })
  }

  function edit() {
    transition(EDIT);
  }


  return (

    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" /> }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && 
        <Confirm message="Are you sure you would like to delete?" 
        onConfirm={() => del(props.id)}
        onCancel={() => transition(SHOW)}
        />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewer}
            value={props.interview.student}
            onCancel={back}
            onSave={save}
            bookInterview={props.bookInterview}
          />          
      )}
      {mode === CREATE && (
        <Form
        id={props.id} 
        interviewers={props.interviewer}
        onCancel={back}
        onSave={save}
        bookInterview={props.bookInterview}
        />
        )}
    </article>

  )

}