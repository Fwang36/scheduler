

export function getAppointmentsForDay(state, day) {
  let result = []
  let result2 = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      result = dayObj.appointments
    }
    return result
  })
  for (let item of result) {
    if (state.appointments[item]) {
      result2.push(state.appointments[item])
    }
  }
  return result2;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null
  } else {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }


}

export function getInterviewersForDay(state, day) {
  let result = []
  let result2 = []
  let result3 = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      result = dayObj.appointments
    }
    return result
  })
  for (let item of result) {
    if (state.appointments[item].interview) {
      result3.push(state.appointments[item].interview.interviewer)
    }
  }
  for (let item of result3) {
    result2.push(state.interviewers[item])
  }
  console.log(result2)
  return result2;
}