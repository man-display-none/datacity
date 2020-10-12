import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export class BuildingInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: true
    }
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    this.props.moreInfo()
  }
  handleClose() {
    this.setState({showModal: !this.state.showModal})
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="buildingData">
              <p>
                {/*building information
            property Type
            property Size
            year built

          Energy usage:
            energy star score
            fuel type
            energy usage
            normalized usage
            greenhouse gas emissions

       */}
              </p>
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

const mapState = state => {
  return {
    moreInfo: state.buildData
  }
}

const mapDispatch = dispatch => {}

export default connect(mapState, mapDispatch)(BuildingInfo)
