import { BandDataBase } from "./data/BandDataBase",


export class BandBusiness {  
    private bandDB: BandDatabase
    constructor(){
      this.bandDB = new BandDatabase
    }
  
    public createBand = async (input: BandInputDTO) => {
      let { name, music_genre, responsible } = input
    
      if(!name || !music_genre || !responsible ) {
        throw new CustomError(422, "falta algo!")
      }
      
      const id = idGenerator.generateId()
  
      const band: bandType = {
          name,
          music_genre,
          responsible
      }
      
      await this.bandDB.insertBand(band)
  
    }