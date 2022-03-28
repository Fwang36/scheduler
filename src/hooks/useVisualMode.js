import { useState} from 'react'

export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  const transition = function(newMode, replace = false) {
    if (replace) {
      setMode((prev) => newMode)
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => prev)

    } else {
      
      setMode(prev => {
        setMode(newMode)
        if (prev !== initial) {
          history.push(prev)
        }
  
      })
    }
  }

  const back = function() {
    let newHistory = [...history]
    setMode(newHistory[newHistory.length - 1])
    newHistory.pop(mode)
    setHistory(newHistory)
  }

  return {
    mode,
    transition,
    back
  }
}

