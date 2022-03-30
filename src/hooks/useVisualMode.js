import { useState } from 'react';

//sets mode based on initial mode
export function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //allows for transition to new modes
  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(prev => newMode);
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory(prev => prev);
    } else {
      setMode(prev => {
        setMode(newMode);
        history.push(prev);
      });
    }
  }

  //allows for transition to previous modes
  const back = function () {
    let newHistory = [...history];
    setMode(newHistory[newHistory.length - 1]);
    if (newHistory.length > 1) {
      newHistory.pop(mode);
    }
    setHistory(prev => newHistory);
  }

  return {
    mode,
    transition,
    back
  }
}

