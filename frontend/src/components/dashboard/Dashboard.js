import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getCurrProfile}
export const Dashboard = (props) => {
  return (
    <div>
      
    </div>
  )
}

Dashboard.propTypes = {
  props: PropTypes
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps, {getCurrProfile})(Dashboard)

