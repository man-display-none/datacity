import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true
    }
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    // this.props.moreInfo()
  }
  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Building Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="buildingData">
              <p>Building id: {this.props.info.base_bbl}</p>
              <p>Energy star score: {this.props.info.energy_star_score}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
