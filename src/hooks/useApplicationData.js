import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday", //application starts with Monday as selected day
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));

  //gets database and sets state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);

  //saves interview and updates state and database server
  function bookInterview(id, interview, appointmentID, update) {
    const appointment = {
      ...state.appointments[appointmentID],
      interview: { student: interview, interviewer: id }
    };
    const appointments = {
      ...state.appointments,
      [appointmentID]: appointment
    };
    const updatedState = {
      ...state,
      appointments,
    };

    setAppointments(appointments);

    return axios.put(`/api/appointments/${appointmentID}`, appointment)
      .then(res => {
        updateSpots(updatedState, appointmentID, update === "no update" ? "no update" : false);
      })
  }

  //removes interview from state and database server
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
        setAppointments(appointments);
        updateSpots(updatedState, id, true);
      })
  }

  //updates number of spots available for day
  const updateSpots = function (state, id, increase = false) {
    const curDay = state.days.find(day => day.appointments.includes(id));

    if (increase === "no update") {
      return curDay.spots;
    } else if (increase) {
      curDay.spots++;
    } else {
      curDay.spots--;
    }
    setState({ ...state, curDay });
  };

  return { state, setDay, bookInterview, deleteInterview }
}