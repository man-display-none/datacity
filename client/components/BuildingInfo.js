import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Sidebar from 'react-sidebar'

export default class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true,
      calculatedECost: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    // this.props.moreInfo()
    this.setState({
      calculatedECost: this.props.info.totalEnergyCost
    })
  }
  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open})
  }
  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }
  handleClick() {
    this.setState({
      calculatedECost: this.props.info.lightingImprovement()
    })
  }
  render() {
    console.log(this.props.info)
    const {
      bbl,
      electricityUse,
      fuelUse,
      ghgEmissions,
      score,
      totalEnergyCost,
      waterUse
    } = this.props.info
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Building Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="buildingData">
              <p>Building id: {bbl}</p>
              <p>EnergyStar score: {score}</p>
              <p>Annual electricity usage: {electricityUse.toFixed(0)} kWh</p>
              <p>Annual fuel usage: {fuelUse.toFixed(0)} MCF</p>
              <p>Annual water usage: {waterUse.toFixed(0)} Gallons</p>
              <p>Annual GHG emissions: {ghgEmissions.toFixed(0)} MTCO2e</p>
              <p>
                Annual energy cost: ${this.state.calculatedECost.toFixed(0)}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClick}>
              Upgrade Lighting
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
