import { CustomError } from "./CustomError"

export interface SqlMessageError {
    code: string,
    errno: number,
    sqlMessage: string,
    sqlState: string,
    index: number,
    sql: string
}


// export class SqlMessageError extends CustomError{
//     constructor(errno: number, sqlMessage: string){
//         super(400, `sqlMessage: ${sqlMessage}, errno: ${errno.toString()}`)
//     }
// }