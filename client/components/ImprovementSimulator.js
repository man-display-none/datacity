import React, {Component} from 'react'
import {connect} from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {updatedInfo, updatedModel} from '../store/buildingInfo'
import ImprovementImpacts from './ImprovementImpacts'
import BuildingModel from './BuildingModel'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

class ImprovementSimulator extends Component {
  constructor() {
    super()
    this.state = {
      emissions: 0,
      electricity: 0,
      fuel: 0,
      water: 0,
      cost: 0,
      lightingChecked: false,
      airSealed: false,
      solarInstalled: false,
      lowFlowInstalled: false,
      roofInsulationInstalled: false,
      vfdInstalled: false,
      windowsInstalled: false,
      unRendered: true
    }
    this.lightingImprovement = this.lightingImprovement.bind(this)
    this.solarInstall = this.solarInstall.bind(this)
    this.airSealing = this.airSealing.bind(this)
    this.lowFlow = this.lowFlow.bind(this)
    this.roofInsulation = this.roofInsulation.bind(this)
    this.vfd = this.vfd.bind(this)
    this.windows = this.windows.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    this.renderModel()
  }
  renderModel() {
    const {
      electricityUse,
      fuelUse,
      waterUse,
      ghgEmissions,
      totalEnergyCost
    } = this.props.buildingModel
    if (this.state.unRendered === true) {
      this.setState({
        electricity: isNaN(electricityUse) ? 'Not Available' : electricityUse,
        fuel: isNaN(fuelUse) ? 'Not Available' : fuelUse,
        water: isNaN(waterUse) ? 'Not Available' : waterUse,
        emissions: isNaN(ghgEmissions) ? 'Not Available' : ghgEmissions,
        cost: totalEnergyCost,
        unRendered: false
      })
    }
  }
  lightingImprovement() {
    const {electricity, emissions, cost} = this.state
    if (this.state.lightingChecked === false) {
      this.setState({
        electricity: electricity * 0.98,
        emissions: emissions * 0.98,
        cost: cost * 0.98,
        lightingChecked: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.98,
        emissions: emissions / 0.98,
        cost: cost / 0.98,
        lightingChecked: false
      })
    }
  }
  solarInstall() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.solarInstalled === false) {
      this.setState({
        electricity: electricity * 0.8,
        fuel: fuel * 0.8,
        emissions: emissions * 0.8,
        cost: cost * 0.8,
        solarInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.8,
        fuel: fuel / 0.8,
        emissions: emissions / 0.8,
        cost: cost / 0.8,
        solarInstalled: false
      })
    }
  }
  airSealing() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.airSealed === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        airSealed: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        airSealed: false
      })
    }
  }
  lowFlow() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.lowFlowInstalled === false) {
      this.setState({
        electricity: electricity * 0.93,
        fuel: fuel * 0.93,
        emissions: emissions * 0.93,
        cost: cost * 0.93,
        lowFlowInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.93,
        fuel: fuel / 0.93,
        emissions: emissions / 0.93,
        cost: cost / 0.93,
        lowFlowInstalled: false
      })
    }
  }
  roofInsulation() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.roofInsulationInstalled === false) {
      this.setState({
        electricity: electricity * 0.97,
        fuel: fuel * 0.97,
        emissions: emissions * 0.97,
        cost: cost * 0.97,
        roofInsulationInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.97,
        fuel: fuel / 0.97,
        emissions: emissions / 0.97,
        cost: cost / 0.97,
        roofInsulationInstalled: false
      })
    }
  }
  vfd() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.vfdInstalled === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        vfdInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        vfdInstalled: false
      })
    }
  }
  windows() {
    const {electricity, fuel, emissions, cost} = this.state
    if (this.state.windowsInstalled === false) {
      this.setState({
        electricity: electricity * 0.96,
        fuel: fuel * 0.96,
        emissions: emissions * 0.96,
        cost: cost * 0.96,
        windowsInstalled: true
      })
    } else {
      this.setState({
        electricity: electricity / 0.96,
        fuel: fuel / 0.96,
        emissions: emissions / 0.96,
        cost: cost / 0.96,
        windowsInstalled: false
      })
    }
  }
  async reset() {
    document.getElementById('lighting').checked = false
    document.getElementById('airsealing').checked = false
    document.getElementById('solar').checked = false
    document.getElementById('lowflow').checked = false
    document.getElementById('roof-insulation').checked = false
    document.getElementById('VFD').checked = false
    document.getElementById('windows').checked = false
    await this.setState({
      unRendered: true,
      lightingChecked: false,
      solarInstalled: false,
      airSealed: false,
      lowFlowInstalled: false,
      roofInsulationInstalled: false,
      vfdInstalled: false,
      windowsInstalled: false
    })
    this.renderModel()
  }
  render() {
    const {electricity, fuel, water, emissions, cost} = this.state
    return (
      <div className="simulator">
        <Container>
          <Row>
            <Col>
              <BuildingModel />
            </Col>
            <Col>
              <div className="projected">
                <h3>Projected Total Use</h3>
                <h5>
                  Electricity:{' '}
                  {isNaN(electricity)
                    ? 'Not Available'
                    : electricity.toFixed(0) + '  kWh'}
                </h5>
                <h5>
                  Fuel:{' '}
                  {isNaN(fuel) ? 'Not Available' : fuel.toFixed(0) + ' Kbtu'}
                </h5>
                <h5>
                  Water:{' '}
                  {isNaN(water)
                    ? 'Not Available'
                    : water.toFixed(0) + ' Gallons'}
                </h5>
                <h5>
                  GHG Emissions:{' '}
                  {isNaN(emissions)
                    ? 'Not Available'
                    : emissions.toFixed(0) + ' Tons'}
                </h5>
                <h5>Total cost: {formatter.format(cost).slice(0, -3)}</h5>
              </div>
            </Col>
            <Col>
              <ImprovementImpacts changes={this.state} />
            </Col>
          </Row>
          {/* <Row>
            <Row>
            <h3>Improvement Options</h3>
            <button type="button" onClick={this.reset}>
                  Reset
                </button>
                </Row>
              <Row>
              <Col md="auto">
              <form className="improvement-options">
                <section className="checkboxes">
                <input
                  name="lighting"
                  type="checkbox"
                  id="lighting"
                  onChange={this.lightingImprovement}
                />
                <p>Lighting improvement</p>
                <input
                  name="airsealing"
                  type="checkbox"
                  id="airsealing"
                  onChange={this.airSealing}
                />
                <label>Insulation improvement</label>
                <input
                  name="solar"
                  type="checkbox"
                  id="solar"
                  onChange={this.solarInstall}
                />
                <label>Install solar</label>
                <input
                  name="lowflow"
                  type="checkbox"
                  id="lowflow"
                  onChange={this.lowFlow}
                />
                <label>Install lowflow faucets + showerheads</label>
                <input
                  name="roof-insulation"
                  type="checkbox"
                  id="roof-insulation"
                  onChange={this.roofInsulation}
                />
                <label>Improve roof insulation</label>
                <input
                  name="VFD"
                  type="checkbox"
                  id="VFD"
                  onChange={this.vfd}
                />
                <label>Improve motors/install VFDs</label>
                <input
                  name="windows"
                  type="checkbox"
                  id="windows"
                  onChange={this.windows}
                />
                <label>Replace windows</label>
                </section>
              </form>
            </Col>
            </Row>
          </Row> */}
          <div className="my-5"></div>
          <div className="row">
            <div className="col-12">
              <form className="improvement-options">
                <div className="row">
                  <h3 className="col-3">Improvement Options</h3>
                  <div className="col-9">
                    <div className="row">
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="lighting"
                            type="checkbox"
                            id="lighting"
                            onChange={this.lightingImprovement}
                            className="mr-2"
                          />
                          <label>Lighting improvement</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="airsealing"
                            type="checkbox"
                            id="airsealing"
                            onChange={this.airSealing}
                            className="mr-2"
                          />
                          <label>Insulation improvement</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="solar"
                            type="checkbox"
                            id="solar"
                            onChange={this.solarInstall}
                            className="mr-2"
                          />
                          <label>Install solar</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="lowflow"
                            type="checkbox"
                            id="lowflow"
                            onChange={this.lowFlow}
                            className="mr-2"
                          />
                          <label>Install lowflow faucets + showerheads</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="roof-insulation"
                            type="checkbox"
                            id="roof-insulation"
                            onChange={this.roofInsulation}
                            className="mr-2"
                          />
                          <label>Improve roof insulation</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="VFD"
                            type="checkbox"
                            id="VFD"
                            onChange={this.vfd}
                            className="mr-2"
                          />
                          <label>Improve motors/install VFDs</label>
                        </div>
                      </div>
                      <div className="col-4 ">
                        <div className="d-flex align-items-center">
                          <input
                            name="windows"
                            type="checkbox"
                            id="windows"
                            onChange={this.windows}
                            className="mr-2"
                          />
                          <label>Replace windows</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="d-block m-auto btn btn-primary"
                    type="button"
                    onClick={this.reset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="my-5"></div>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    buildingData: state.buildingInfoReducer.buildingData,
    buildingModel: state.buildingInfoReducer.buildingModel
  }
}
const mapDispatch = dispatch => {
  return {
    updateInfo: buildingId => dispatch(updatedInfo(buildingId)),
    updateModel: buildingId => dispatch(updatedModel(buildingId))
  }
}
export default connect(mapState, mapDispatch)(ImprovementSimulator)
