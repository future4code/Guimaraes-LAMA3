import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {

    private bandBusiness: BandBusiness
    constructor(){
      this.bandBusiness = new BandBusiness()
    }

    public createBand = async (req: Request, res: Response) => {
      try {
        
        const band: BandInputDTO = {
          id: req.body.id
          name: req.body.name,
          music_genre: req.body.music_genre,
          responsible: req.body.responsible,
          
        }

          await this.bandBusiness.createBand(band)
  
          res.status(201).send({ message: "Banda criada!" });
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    }; 