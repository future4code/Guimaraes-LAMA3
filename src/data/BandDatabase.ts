import { CustomError } from "../error/CustomError";
import { Band, BandSearchDTO, bandType } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private tableName: string
    
    constructor(){
      super()
      this.tableName = "IWFS_Bandas"
    }
  
    public insertBand = async (recipe: bandType) => {
      try {
        await this.getConnection()
          .insert({
            id: recipe.id,
            name: recipe.name,
            music_genre: recipe.music_genre,
            responsible: recipe.responsible
      }).into(this.tableName.toString());

      } catch (error) {
        throw new CustomError(400, "Ocorreu um erro");    
      }
    }

    public getBandByNameOrId = async (input: BandSearchDTO) => {
      try {
        const result = await this.getConnection()
          .select("*")
          .from(this.tableName.toString())
          .where("id", input.id)
          .orWhere("name", input.name)

          return Band.toBandModel(result[0])
      } catch (error) {
        throw new CustomError(400, "Ocorreu um erro");   
      }
      
    }
}