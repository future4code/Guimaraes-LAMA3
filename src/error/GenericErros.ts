import { CustomError } from "./CustomError";

export class InvalidParameters extends CustomError{
    constructor(){
        super(422, 'Parâmetros inválido')
    }
}