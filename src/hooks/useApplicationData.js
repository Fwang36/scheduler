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

    const updatedState = {
      ...state,
      appointments,
    };
    setAppointments(appointments)

 return axios.put(`/api/appointments/${appointmentID}`, appointment)
      .then(res => {     
        console.log("saved", state.appointments)
        updateSpots(updatedState, appointmentID)
      })

  }

  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
     const appointments = {
       ...state.appointments,
       [id]: appointment
     };

     const updatedState = {
      ...state,
      appointments,
    };
     
     return axios.delete(`/api/appointments/${id}`)
     .then(res => {
       console.log("Delete", appointments)
       setAppointments(appointments)
       updateSpots(updatedState, id, true)
      })
  }

  const updateSpots = function (state, id, increase = false) {
    const curDay = state.days.find(day => day.appointments.includes(id))

    if (increase) {
      curDay.spots++
    } else {
      curDay.spots--
    }
    setState({...state, curDay})

  };


  return {state, setDay, bookInterview, deleteInterview}
}