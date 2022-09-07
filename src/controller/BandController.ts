import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {

    private bandBusiness: BandBusiness
    constructor(){
      this.bandBusiness = new BandBusiness()
    }

    public createBand = async (req: Request, res: Response) => {
      try {

        const { id, name, music_genre, responsible } = req.body
        
        const band: BandInputDTO = {
          id: id,
          name: name,
          music_genre: music_genre,
          responsible: responsible          
        }

          await this.bandBusiness.createBand(band)
  
          res.status(201).send({ message: "Banda criada!" });
      } catch (error: any) {
          res.status(400).send(error.message);
      }
    }
} 