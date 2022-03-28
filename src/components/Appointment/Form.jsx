import React, {useState} from 'react'
import Button from '../Button'
import InterviewerList from 'components/InterviewerList'


export default function Form(props) {
  console.log("form",props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewers || null);

  const reset = () => {
    setStudent("") 
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }


  return(

<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        onChange={(e) => setStudent(e.target.value)}
        value={student}
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={(e) => setInterviewer(e)}

    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => {
        props.onSave(student, interviewer, props.id)
        }}>Save</Button>
    </section>
  </section>
</main>


  )

}
