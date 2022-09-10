export type showType = {
    id: string
    band_id: string
    date: Date
    time: number
 }
 

 export interface ShowInputDTO {
    id: string
    band_id: string
    date: Date
    time: number
 }

 export interface ShowSearchDTO{
    id: string
    date: Date
  }

 export class Show{
   constructor(
    
       private id: string,
       private band_id: string,
       private date: Date,
       private time: number,
       
   ){}

   getId(){
    return this.id;
}

   getBandId(){
       return this.band_id;
   }

   getDate(){
       return this.date
   }

   getTime(){
       return this.time;
   }

   setId(id: string){
    this.id = id;
}

   setBandId(band_id: string){
       this.band_id = band_id;
   }

   setDate(date: Date){
       this.date = date;
   }

   setTime(time: number){
       this.time = time;
   }

  static toShowModel(show: any): Show {
       return new Show(show.id,show.band_id, show.date,show.time );
   }
}
