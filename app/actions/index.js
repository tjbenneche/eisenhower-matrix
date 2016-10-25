
/*
 * action types
 */

export const ADD_TASK = 'ADD_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTask(text, box) {
  return {
    type: ADD_TASK,
    box,
    text
  }
}

export function toggleTask(index){
  type: TOGGLE_TASK,
  index
}

export function setVisibilityFilter(filter){
  type: SET_VISIBILITY_FILTER,
  filter
}