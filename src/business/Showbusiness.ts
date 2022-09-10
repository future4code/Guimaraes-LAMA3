import { ShowDatabase } from "../data/ShowDatabase"
import { ShowInputDTO, ShowSearchDTO } from "../model/Show"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    showDatabase: ShowDatabase
    idGenerator: IdGenerator
    authenticator: any
  
    constructor(){
      this.showDatabase = new ShowDatabase()
      this.idGenerator = new IdGenerator()
    }
  
    public async createShow(show: ShowInputDTO) {
  
        const id = this.idGenerator.generate();
  
        await this.showDatabase.createShow(id, show.band_id, show.date, show.time );
  
        const accessToken = this.authenticator.generateToken({ id });
  
        return accessToken;
    }
  
    public async getShowByDate(show: ShowSearchDTO) {
  
        const showFromDB = await this.showDatabase.getShowByDate(show.date);
  
        const accessToken = this.authenticator.generateToken({ id: showFromDB.getId(), date: showFromDB.getDate() });
    
        return accessToken;
    }
  
   
  }