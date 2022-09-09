import { BaseDatabase } from "../data/BaseDatabase";

export class Migrations extends BaseDatabase{

    public async create(){

        
    const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

        this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS IWFS_User (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT 'NORMAL'
            );

        `).then((sqlMessage) => { 
            if(sqlMessage[0].warningCount === 1){
                console.log("1050 Table 'IWFS_User' already exists") 
            }else(
                console.log("Tabelas criadas: IWFS_User")  
            )            
        })
        .catch(printError)

        this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS IWFS_Bandas (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                music_genre VARCHAR(255) NOT NULL,
                responsible VARCHAR(255) UNIQUE NOT NULL 
            );
        `).then((sqlMessage) => { 
            if(sqlMessage[0].warningCount === 1){
                console.log("1050 Table 'IWFS_Bandas' already exists") 
            }else(
                console.log("Tabelas criadas: IWFS_Bandas")  
            )            
        })
        .catch(printError);
        
        this.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS IWFS_Shows (
                id VARCHAR(255) PRIMARY KEY,
                week_day VARCHAR(255) NOT NULL,
                start_time INT NOT NULL,
                end_time INT NOT NULL,
                band_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(band_id) REFERENCES IWFS_Bandas(id)
            );  
        `).then((sqlMessage) => { 
            if(sqlMessage[0].warningCount === 1){
                console.log("1050 Table 'IWFS_Shows' already exists") 
            }else(
                console.log("Tabelas criadas: IWFS_Shows")
            )            
        })
        .catch(printError)
    }
}