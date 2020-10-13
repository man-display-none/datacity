export default class Building {
  constructor(electricityUse, fuelUse, waterUse, ghgEmissions, score, bbl) {
    this.electricityUse = Number(electricityUse)
    this.fuelUse = Number(fuelUse)
    this.waterUse = Number(waterUse)
    this.ghgEmissions = Number(ghgEmissions)
    this.score = Number(score)
    this.bbl = Number(bbl)

    this.totalEnergyCost =
      Number(electricityUse) * 0.14 + Number(fuelUse) * 0.007
  }
  lightingImprovement() {
    this.totalEnergyCost = this.totalEnergyCost * 0.98
    return this.totalEnergyCost
  }
  airSealing() {
    this.totalEnergyCost = this.totalEnergyCost * 0.96
    return this.totalEnergyCost
  }
  roofInsulation() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
    return this.totalEnergyCost
  }
  burnerImprovement() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
    return this.totalEnergyCost
  }
}

// sources:
//reduction factors from CPC EE Handbook: https://communityp.com/wp-content/uploads/2017/05/CPC_Underwriting_Efficiency_Handbook_Full_Interactive_FINAL.pdf)
//energy use costs: https://www.nyserda.ny.gov/Researchers-and-Policymakers/Energy-Prices

//notes:
//assuming commercial rates and fuelUse is just natural gas for now; will need to expand to other fuels as applicable
//also need to convert kbtu to mcf for fuel use
//applying Number constructor because arguments will likely be entered as strings
