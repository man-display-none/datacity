import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, filterApply} from '../store'
import {Dropdown, Accordion, Card, Button} from 'react-bootstrap'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn, filterClick}) => {
  const [rangeId, setId] = useState()
  let [rangeVal, setRangeVal] = useState()
  const handleFilter = e => {
    e.preventDefault()
    filterClick({
      id: rangeId,
      value: rangeVal
    })
  }

  return (
    <div className="navdiv">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">
          <img src="/datacity.png" height="50rem" width="200rem" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={handleClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="btn-group">
          <Dropdown className="filter-button">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Energy Star Score
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <form className="form-nav" onSubmit={handleFilter}>
                        <div className="min-max">
                          <input
                            type="range"
                            name="energy_star_score"
                            min="1"
                            max="100"
                            defaultValue="50"
                          />
                          <div>
                            <div className="min">1</div>
                            <div className="max">100</div>
                          </div>
                        </div>
                        <div className="button-div">
                          <Button
                            type="submit"
                            className="nav-button"
                            id="energy_star_score"
                            onClick={e => {
                              return (
                                setId(e.target.id),
                                setRangeVal(
                                  document.getElementsByName(e.target.id)[0]
                                    .value
                                )
                              )
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Year of Construction
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <form className="form-nav" onSubmit={handleFilter}>
                        <div className="min-max">
                          <input
                            type="range"
                            name="cnstrct_yr"
                            min="1800"
                            max="2020"
                            defaultValue="1950"
                          ></input>
                          <div>
                            <div className="min">1800</div>
                            <div className="max">2020</div>
                          </div>
                        </div>
                        <div className="button-div">
                          <Button
                            type="submit"
                            className="nav-button"
                            id="cnstrct_yr"
                            onClick={e => {
                              return (
                                setId(e.target.id),
                                setRangeVal(
                                  document.getElementsByName(e.target.id)[0]
                                    .value
                                )
                              )
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Property Type
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <form className="form-nav" onSubmit={handleFilter}>
                        <div className="min-max">
                          <label htmlFor="largest_property_use_type">
                            Choose a property type:
                          </label>
                          <select name="largest_property_use_type">
                            <option value="">
                              --Please choose an option--
                            </option>
                            <option value="Multifamily Housing">
                              Multifamily Housing
                            </option>
                            <option value="Office">Office</option>
                            <option value="K-12 School">School</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="button-div">
                          <Button
                            type="submit"
                            id="largest_property_use_type"
                            className="nav-button"
                            onClick={e => {
                              return (
                                setId(e.target.id),
                                setRangeVal(
                                  document.getElementsByName(e.target.id)[0]
                                    .value
                                )
                              )
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Property Size
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <form className="form-nav" onSubmit={handleFilter}>
                        <div className="min-max">
                          <input
                            type="range"
                            name="dof_gross_floor_area_ft"
                            min="100000"
                            max="1000000"
                            defaultValue="500000"
                          ></input>
                          <div>
                            <div className="min">Min</div>
                            <div className="max">Max</div>
                          </div>
                        </div>
                        <div className="button-div">
                          <Button
                            type="submit"
                            id="dof_gross_floor_area_ft"
                            className="nav-button"
                            onClick={e => {
                              return (
                                setId(e.target.id),
                                setRangeVal(
                                  document.getElementsByName(e.target.id)[0]
                                    .value
                                )
                              )
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </nav>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    filterClick(e) {
      dispatch(filterApply(e))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  filterClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
