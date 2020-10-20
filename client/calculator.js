export default class Building {
  constructor(electricityUse, fuelUse, waterUse, ghgEmissions, score) {
    this.electricityUse = Number(electricityUse)
    this.improvedElectricity = 0
    this.prevElectricityUse = Number(electricityUse)
    this.fuelUse = Number(fuelUse)
    this.improvedFuel = 0
    this.prevFuelUse = Number(fuelUse)
    this.waterUse = Number(waterUse)
    this.improvedWater = 0
    this.prevWaterUse = Number(waterUse)
    this.ghgEmissions = Number(ghgEmissions)
    this.improvedEmissions = 0
    this.prevGhgEmissions = Number(ghgEmissions)
    this.score = Number(score)
    this.totalEnergyCost =
      Number(electricityUse) * 0.14 + Number(fuelUse) * 0.007
    this.improvedCost = 0
    this.prevCost = Number(electricityUse) * 0.14 + Number(fuelUse) * 0.007
    this.airSealed = false
  }
  lightingImprovement() {
    this.improvedCost = this.totalEnergyCost * 0.98
    this.improvedEmissions = this.ghgEmissions * 0.98
    this.improvedElectricity = this.electricityUse * 0.98
    return [this.improvedCost, this.improvedEmissions, this.improvedElectricity]
  }
  removeLightingImprovement() {
    return [this.totalEnergyCost, this.ghgEmissions, this.electricityUse]
  }
  airSealing() {
    this.improvedCost = this.totalEnergyCost * 0.96
    this.improvedEmissions = this.ghgEmissions * 0.96
    this.improvedElectricity = this.electricityUse * 0.96
    return [this.improvedCost, this.improvedEmissions, this.improvedElectricity]
  }
  removeAirSealing() {
    return [this.totalEnergyCost, this.ghgEmissions]
  }
  roofInsulation() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
    this.ghgEmissions = this.ghgEmissions * 0.97
    return [this.totalEnergyCost, this.ghgEmissions]
  }
  burnerImprovement() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
    this.ghgEmissions = this.ghgEmissions * 0.97
    return [this.totalEnergyCost, this.ghgEmissions]
  }
  solarInstall() {
    this.improvedCost = this.totalEnergyCost * 0.8
    this.improvedEmissions = this.ghgEmissions * 0.8
    this.improvedElectricity = this.electricityUse * 0.8
    this.improvedFuel = this.improvedFuel * 0.8
    return [
      this.improvedCost,
      this.improvedEmissions,
      this.improvedElectricity,
      this.improvedFuel
    ]
  }
  removeSolar() {
    return [this.totalEnergyCost, this.ghgEmissions, this.electricityUse]
  }
}

// sources:
//reduction factors from CPC EE Handbook: https://communityp.com/wp-content/uploads/2017/05/CPC_Underwriting_Efficiency_Handbook_Full_Interactive_FINAL.pdf)
//energy use costs: https://www.nyserda.ny.gov/Researchers-and-Policymakers/Energy-Prices

//notes:
//assuming commercial rates and fuelUse is just natural gas for now; will need to expand to other fuels as applicable
//also need to convert kbtu to mcf for fuel use
