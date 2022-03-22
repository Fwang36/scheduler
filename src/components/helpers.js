export const formatSpots = (spot) => {
  let result;
  if (spot === 0) {
    result = "no spots remaining"
  } else if (spot === 1) {
    result = "1 spot remaining"
  } else {
    result = `${spot} spots remaining`
  }
  return result
} 
