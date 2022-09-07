import { faBandAid } from "@fortawesome/free-solid-svg-icons";
import { getGeneratedNameForNode } from "typescript";
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
        await BandDatabase.connection
          .insert({
            id: band.id,
            name: band.name,
            music_genre: band.music_genre,
            responsible: band.responsible
 }
          })
          .into(this.tableName.toString());
      } catch (error: any) {
        throw new CustomError(400, error.message);
      }
    };