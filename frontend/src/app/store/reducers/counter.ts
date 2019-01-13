import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/counter.actions';


export function counterReducer(state = {
  counter: 0
}, action: Action) {
  console.log(action);

  switch (action.type) {
    case ActionTypes.Increment:
      return {...state, counter: state.counter + 1};

    case ActionTypes.Decrement:
      return {...state, counter: state.counter - 1};

    case ActionTypes.Reset:
      return {...state, counter: 0};

    default:
      return state;
  }
}
