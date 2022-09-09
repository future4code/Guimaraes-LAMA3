import { CustomError } from "./CustomError";

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, 'Senha inválida')
    }
}

export class InvalidParameters extends CustomError{
    constructor(){
        super(400, 'Parâmetros inválido')
    }
}

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, 'E-mail inválido')
    }
}
