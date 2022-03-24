export function getAppointmentsForDay(state, day) {
  let result = []
  let result2 = []
  state.days.map(dayObj => {
    if (dayObj.name == day) {
      result = dayObj.appointments
    }
  })
  for (let item of result) {
    if (state.appointments[item]) {
      result2.push(state.appointments[item])
    }
  }
  return result2;
}