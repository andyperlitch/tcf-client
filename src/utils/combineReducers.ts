export function combineReducers<
  T extends Record<string, any>,
  A = any
>(reducers: {
  [K in keyof T]: (state: T[K], action: A) => T[K];
}) {
  return (state: T, action: A): T => {
    const nextState: T = {} as T;
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}
