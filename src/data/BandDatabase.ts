import { CustomError } from "../error/CustomError";
import { bandType } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private tableName: String
    
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

      } catch (error: any) {
        throw new CustomError(400, error.message);
      }
    }
}