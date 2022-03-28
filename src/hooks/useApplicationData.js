import {useState, useEffect} from "react";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({...prev, days}));
  const setAppointments = appointments => setState(prev => ({...prev, appointments}))
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}))


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setDays(all[0].data)
      setAppointments(all[1].data)
      setInterviewers(all[2].data)
    })
  }, [])


  function bookInterview(id, interview, appointmentID) {

    const appointment = {
      ...state.appointments[appointmentID],
      interview: { student: interview, interviewer: id}
    };
    const appointments = {
      ...state.appointments,
      [appointmentID]: appointment
    };
    
    return axios.put(`/api/appointments/${appointmentID}`, appointment)
      .then(res => {
        console.log(res)
        setAppointments(appointments)
      })
      .catch(error => console.error(error))
  }

  function deleteInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
      })
      .catch(error => console.error(error))
  }



  return {state, setDay, bookInterview, deleteInterview}
}