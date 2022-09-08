import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { hash } from "bcryptjs";
import { CustomError } from "../error/CustomError";

export class UserBusiness {
    userDB: any;

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }

    public login = async (input: LoginInputDTO) => {
        let { email, password} = input
    
        if(!email || !password) {
          throw new CustomError(400, "falta parametro")
        }
    
        const user = await this.userDB.findUserByEmail(email)
        const hashCompare = await HashManager.compareHash(
          password,
          user.password
        )
    
        if(!hashCompare){
          throw new InvalidPassword()
        }
    
        const payload: Authenticator = {
          id: user.id
        }
    
        const token = Authenticator.generateToken(payload)
    
        return token    
}
}