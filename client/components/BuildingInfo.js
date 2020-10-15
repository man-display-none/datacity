import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './BuildingInfo.css'

class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true,
      calculatedECost: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onDetails = this.onDetails.bind(this)
  }
  componentDidMount() {
    // this.props.moreInfo()
    this.setState({
      calculatedECost: this.props.info.totalEnergyCost
    })
  }
  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }
  handleClick() {
    this.setState({
      calculatedECost: this.props.info.lightingImprovement()
    })
  }
  onDetails(e) {
    e.preventDefault()
    this.handleClose()
    console.log('this.props.history', this.props.history)
  }
  render() {
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
            {/* <Button variant="secondary" onClick={this.onDetails}>
              <BrowserRouter>
                <Link to={`/building/${bbl}`}>Building Details</Link>
              </BrowserRouter>
            </Button> */}
            <button type="button" className="btn btn-primary">
              <a variant="primary" href={`/building/${bbl}`}>
                Building Details
              </a>
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default BuildingInfo
