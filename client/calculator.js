// sources:

//reduction factors from CPC EE Handbook: https://communityp.com/wp-content/uploads/2017/05/CPC_Underwriting_Efficiency_Handbook_Full_Interactive_FINAL.pdf)

//energy use costs: https://www.nyserda.ny.gov/Researchers-and-Policymakers/Energy-Prices

export class BuildingEnergy {
  constuctor(totalEnergyUse, electricityUse, fuelUse, waterUse, ghgEmissions) {
    //applying Number constructor because arguments will likely be entered as strings
    this.totalEnergyUse = Number(totalEnergyUse)
    this.electricityUse = Number(electricityUse)
    this.fuelUse = Number(fuelUse)
    this.waterUse = Number(waterUse)
    this.ghgEmissions = Number(ghgEmissions)
    //assuming commercial rates and fuelUse is just natural gas for now; will need to expand to other fuels as applicable
    //also need to convert kbtu to mcf for fuel use
    this.totalEnergyCost = Number(electricityUse * 0.14) + Number(fuelUse * 7)
  }
  lightingImprovement() {
    this.totalEnergyCost = this.totalEnergyCost * 0.98
  }
  airSealing() {
    this.totalEnergyCost = this.totalEnergyCost * 0.96
  }
  roofInsulation() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
  }
  burnerImprovement() {
    this.totalEnergyCost = this.totalEnergyCost * 0.97
  }
}

//standby building object if needed
// let bldg = {
//   totalEnergy: 0,
//   totalEnergyCost: 0,
//   totalElectricity: 0,
//   totalElectricityCost: 0,
//   totalFuel: 0,
//   totalFuelCost: 0
// }
