import { BandDatabase } from "../data/BandDatabase"
import { CustomError } from "../error/CustomError"
import { InvalidParameters } from "../error/GenericErros"
import { BandInputDTO, BandSearchDTO, bandType } from "../model/Band"
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
    
      try {
        if(!name || !music_genre || !responsible ) {
          throw new InvalidParameters()
        }
        
        const id = this.idGenerator.generate()
    
        const band: bandType = {
            id,
            name,
            music_genre,
            responsible
        }      
    
        await this.bandDB.insertBand(band)    
        
      } catch (error) {
          throw new CustomError(400, "Ocorreu um erro");          
      }
      
    }

    public getBandByNameOrId = async (input: BandSearchDTO) =>{
      let { id, name } = input
      try {
        
        if(!id && !name){
          throw new InvalidParameters();          
        }

        return await this.bandDB.getBandByNameOrId(input)

      } catch (error) {
        throw new CustomError(400, "Ocorreu um erro");       
      }
    }
}