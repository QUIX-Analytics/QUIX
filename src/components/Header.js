import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Header = ({ loggedIn }) => (
  <div>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
    { loggedIn && <Link to='/secret'>Secret</Link> }
  </div>
)

Header.propTypes = {
  loggedIn: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

export default connect(mapStateToProps)(Header)
