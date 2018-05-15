import axios from 'axios'
import _ from 'lodash'
export const LOAD_DATA = 'LOAD_DATA'
export const SET_LOADING = 'SET_LOADING'
export const CHANGE_EXPERIMENTS_FILTER = 'CHANGE_EXPERIMENTS_FILTER'
export const CHANGE_DEMOGRAPHICS_FILTER = 'CHANGE_DEMOGRAPHICS_FILTER'
export const LOAD_INITIAL_EXPERIMENTS_SELECTION = 'LOAD_INITIAL_EXPERIMENTS_SELECTION'
export const LOAD_INITIAL_DEMOGRAPHICS_SELECTION = 'LOAD_INITIAL_DEMOGRAPHICS_SELECTION'
export const CHANGE_DEMO_GROUP_SELECTIONS = 'CHANGE_DEMO_GROUP_SELECTIONS'

const os = require('os');
const hostname = os.hostname();

const getInitialSelection = data => filter => _.chain(data)
  .filter(filter)
  .sortBy(d => (1 / d.total_pop))
  .value()[0]

export const loadData = () => dispatch => {
  axios({ method: 'post', url: `http://${hostname}:8080/table/cace_metrics/`, data: {} })
    .then(res => {
      dispatch({ type: LOAD_DATA, data: res.data })
      let initiate = getInitialSelection(res.data)
      dispatch({ type: LOAD_INITIAL_EXPERIMENTS_SELECTION, selection: initiate({year: '2017', dem1: 'org', dem1_value: 'NYCET', dem2: 'all'}) })
      dispatch({ type: LOAD_INITIAL_DEMOGRAPHICS_SELECTION, selection: initiate({year: '2017', election: 'General', dem1: 'race'}) })
      dispatch({ type: SET_LOADING, loading: false })
    }
  )
}

const changeFilter = (type, payload) => {
  return { type, payload }
}
const dispatchFilter = type => (payload) => dispatch => dispatch(changeFilter(type, payload))

export const changeExperimentsFilter = dispatchFilter(CHANGE_EXPERIMENTS_FILTER)
export const changeDemographicsFilter = dispatchFilter(CHANGE_DEMOGRAPHICS_FILTER)
