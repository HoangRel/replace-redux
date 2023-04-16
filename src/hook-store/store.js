import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifiter) => {
    const newState = actions[actionIdentifiter](globalState);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter(li !== li.setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initStore) => {
  if (initStore) {
    globalState = { ...globalState, ...initStore };
    actions = { ...actions, ...userActions };
  }
};
