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

    const newState = {
      ...state,
      appointments,
    };
    setAppointments(appointments)

 return axios.put(`/api/appointments/${appointmentID}`, appointment)
      .then(res => {     
        console.log("saved", state.appointments)
        updateSpots(newState, id)
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

     const newState = {
      ...state,
      appointments,
    };
     
     return axios.delete(`/api/appointments/${id}`)
     .then(res => {
       console.log("Delete", appointments)
       setAppointments(appointments)
       updateSpots(newState, id)
      })
  }

  const updateSpots = function (state, id) {
    const currentDay = state.days.find((d) => d.appointments.includes(id));
  
    const nullAppointments = currentDay.appointments.filter(id => !state.appointments[id].interview) 
    const spots = nullAppointments.length 


    const newDay = { ...currentDay, spots };

    const newDays = state.days.map((d) => { return d.name === state.day ? newDay : d});

    setState({ ...state, days: newDays });

    return newDays;
  };


  return {state, setDay, bookInterview, deleteInterview}
}