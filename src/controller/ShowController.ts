import { ShowBusiness } from "../business/Showbusiness"
import { ShowInputDTO } from "../model/Show"

export class ShowController {

    private showBusiness: ShowBusiness
    constructor(){
      this.showBusiness = new ShowBusiness()
    }

    public createShow = async (req: Request, res: Response) => {
      try {

        const { id, band_id, date, time } = req.body
        
        const show: ShowInputDTO = {
          id: id,
          band_id: band_id,
          date: date,
          time: time          
        }

          await this.showBusiness.createShow(show)
  
          res.status(201).send({ message: "Show criado!" });
      } catch (error) {
          res.status(400).send({ error: error });
      }
    }


    public getShowByDate = async (req: Request, res: Response) =>{
      try {
        const { id, date } = req.body as ShowSearchDTO
        const show: ShowSearchDTO ={
          id,
          date
        }
        const result = await this.showBusiness.getShowByDate(show)
        res.status(201).send(result);
      } catch (error) {
        res.status(400).send({ error: error });
      }
    }
} 