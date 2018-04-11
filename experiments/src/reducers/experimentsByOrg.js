import { CHANGE_EXPERIMENTS_FILTER } from '../actions/'
import { changeFilter } from './index'
  
const initialState = {
  selectors: {
    election: null,
    org: null
  }
}

const experimentsByOrg = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPERIMENTS_FILTER:
      return changeFilter(state, action)
    default:
      return state
  }
}

export default experimentsByOrg
