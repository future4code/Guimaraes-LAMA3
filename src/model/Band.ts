export type bandType = {
    id: string
    name: string
    music_genre: string
    responsible: string
 }
 

 export interface BandInputDTO {
    id: string
    name: string
    music_genre: string
    responsible: string
 }


 export interface BandSearchDTO{
   name?: string
   id?: string
 }
 export class Band{
   constructor(
       private id: string,
       private name: string,
       private music_genre: string,
       private responsible: string
   ){}

   getId(){
       return this.id;
   }

   getName(){
       return this.name
   }

   getEmail(){
       return this.music_genre;
   }

   getPassword(){
       return this.responsible;
   }

   setId(id: string){
       this.id = id;
   }

   setName(name: string){
       this.name = name;
   }

   setEmail(music_genre: string){
       this.music_genre = music_genre;
   }

   setPassword(responsible: string){
       this.responsible = responsible;
   }


   static toBandModel(band: any): Band {
       return new Band(band.id, band.name, band.music_genre, band.responsible );
   }
}
