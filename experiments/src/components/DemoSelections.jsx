import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DemoSelections = ({options, onChange, value}) => 
  <div> 
    <b>Demographic Combinations</b>
    <div> * choose up to six </div>
    <Dropdown
      fluid multiple selection
      options={options} onChange={onChange} value={value}
    />
  </div>

export default DemoSelections