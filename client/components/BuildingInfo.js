import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './BuildingInfo.css'

class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
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
    console.log(this.props.info)
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Building Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="buildingData">
              <p>Building id: {base_bbl}</p>
              <p>Address: {address_1_self_reported}</p>
              <p>Property Type: {largest_property_use_type}</p>
              <p>Property Size: {dof_gross_floor_area_ft} sqft</p>
              <p>Year Built: {cnstrct_yr}</p>
              <p>
                EnergyStar score:{' '}
                {energy_star_score === 0 ? 'Not Available' : energy_star_score}
              </p>
              <p>
                Annual electricity usage:
                {isNaN(totalElectricity)
                  ? totalElectricity
                  : totalElectricity.toFixed(0) + 'kWh'}
              </p>
              <p>
                Annual fuel usage:{' '}
                {isNaN(totalFuel) ? totalFuel : totalFuel.toFixed(0) + 'MCF'}
              </p>
              <p>
                Annual water usage:{' '}
                {isNaN(totalWater)
                  ? totalWater
                  : totalWater.toFixed(0) + 'Gallons'}
              </p>
              <p>
                Annual GHG emissions:{' '}
                {isNaN(ghg) ? ghg : ghg.toFixed(0) + 'MTCO2e'}
              </p>
            </div>
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
