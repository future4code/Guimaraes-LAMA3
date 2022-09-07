import { BandDatabase } from "../data/BandDatabase"
import { CustomError } from "../error/CustomError"
import { BandInputDTO, bandType } from "../model/Band"
import { IdGenerator } from "../services/IdGenerator"

export class BandBusiness {  
    private bandDB: BandDatabase
    private idGenerator: IdGenerator

    constructor(){
      this.bandDB = new BandDatabase
      this.idGenerator = new IdGenerator()
    }
  
    public createBand = async (input: BandInputDTO) => {
      let { name, music_genre, responsible } = input
    
      if(!name || !music_genre || !responsible ) {
        throw new CustomError(422, "falta algo!")
      }
      
      const id = this.idGenerator.generate()
  
      const band: bandType = {
          id,
          name,
          music_genre,
          responsible
      }
      
      await this.bandDB.insertBand(band)  
    }
}