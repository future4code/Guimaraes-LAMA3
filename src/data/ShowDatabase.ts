import { CustomError } from "../error/CustomError";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    [x: string]: any;

    private static TABLE_NAME = "IWFS_Shows";
  
    public async createShow(
      id: string,
      band_id: string,
      date: Date,
      time: number,
      
    ): Promise<void> {
      try {
        await this.getConnection()
          .insert({
            id,
            band_id,
            date,
            time,
          })
          .into(ShowDatabase.TABLE_NAME);
        
      } catch (error) {        
         throw new CustomError(400, `${error}`)
      }
    }
  
    public async getUserByDate(date: Date): Promise<Show> {
      const result = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({ date });
  
      return Show.toShowModel(result[0]);
    }
  
  }