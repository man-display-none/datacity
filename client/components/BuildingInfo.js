import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import './BuildingInfo.css'

class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.formatStreetAddress = this.formatStreetAddress.bind(this)
    this.toTitleCase = this.toTitleCase.bind(this)
  }
  toTitleCase = function(str) {
    if (typeof str === 'undefined') return
    return str.toLowerCase().replace(/(?:^|\s|\/|\-)\w/g, function(match) {
      return match.toUpperCase()
    })
  }

  formatStreetAddress(address) {
    address = address.replace(/[.,]/g, '')
    var replaceWords = {
        apartment: '#',
        apt: '#',
        expressway: 'Expy',
        'po box': '#',
        suite: '#',
        ste: '#',
        avenue: 'Ave',
        boulevard: 'Blvd',
        circle: 'Cir',
        court: 'Ct',
        crt: 'Ct',
        drive: 'Dr',
        lane: 'Ln',
        mount: 'Mt',
        highway: 'Hwy',
        parkway: 'Pkwy',
        place: 'Pl',
        street: 'St',
        east: 'E',
        west: 'W',
        south: 'S',
        north: 'N',
        road: 'Rd'
      },
      formatted_address = []
    address.split(' ').forEach(function(word) {
      word = word.toLowerCase().trim()
      if (replaceWords[word]) {
        formatted_address.push(replaceWords[word])
        return
      }
      formatted_address.push(word)
    })
    formatted_address = formatted_address.join(' ')
    formatted_address = formatted_address.replace(/\# /g, '#')
    return this.toTitleCase(formatted_address)
  }

  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    console.log(this.props)
    const {
      cnstrct_yr,
      address_1_self_reported,
      totalElectricity,
      totalFuel,
      totalWater,
      ghg,
      energy_star_score,
      base_bbl,
      largest_property_use_type,
      dof_gross_floor_area_ft
    } = this.props.info
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          dialogClassName="custom-modal"
        >
          <Modal.Header>
            <Modal.Title>Building Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  About this building
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      Building id : <b>{base_bbl}</b>
                    </p>
                    <p>
                      Address :{' '}
                      <b>{this.formatStreetAddress(address_1_self_reported)}</b>
                    </p>
                    <p>
                      Property Type : <b>{largest_property_use_type}</b>
                    </p>
                    <p>
                      Property Size : <b>{dof_gross_floor_area_ft} sqft</b>
                    </p>
                    <p>
                      Year Built : <b>{cnstrct_yr}</b>
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Energy usage
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>
                      EnergyStar score :{' '}
                      <b>
                        {energy_star_score === 0
                          ? 'Not Available'
                          : energy_star_score}
                      </b>
                    </p>
                    <p>
                      Annual electricity usage :{' '}
                      <b>
                        {isNaN(totalElectricity)
                          ? totalElectricity
                          : totalElectricity.toFixed(0) + 'kWh'}
                      </b>
                    </p>
                    <p>
                      Annual fuel usage :{' '}
                      <b>
                        {isNaN(totalFuel)
                          ? totalFuel
                          : totalFuel.toFixed(0) + 'MCF'}
                      </b>
                    </p>
                    <p>
                      Annual water usage :{' '}
                      <b>
                        {isNaN(totalWater)
                          ? totalWater
                          : totalWater.toFixed(0) + 'Gallons'}
                      </b>
                    </p>
                    <p>
                      Annual GHG emissions:{' '}
                      <b>{isNaN(ghg) ? ghg : ghg.toFixed(0) + 'MTCO2e'}</b>
                    </p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" href={`/building/${base_bbl}`}>
              Building Details
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default BuildingInfo
