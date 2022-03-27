import {React, useState} from 'react'

export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)

  const transition = function(newMode) {
    setMode(newMode)
  }

  return {
    mode,
    transition
  }
}

