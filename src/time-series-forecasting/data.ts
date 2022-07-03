type JenaWeather = {

}

const Dataset = (): JenaWeather => {
  const csv: string = 'jena_climate_2009_2016.csv'
  // url for the external download
  const endpointURL: string = `https://storage.googleapis.com/learnjs-data/jena_climate/${csv}`
  // path for local
  const path: string = `./${csv}`
  
  // check if the .csv exists, if not download it from given URL
  
  return {

  }
}

export { JenaWeather, Dataset }
