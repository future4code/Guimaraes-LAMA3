import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { InvalidPassword } from "../error/UserError";
import { AuthenticatorData } from "../model/Authenticator";

export class UserBusiness {
  userDatabase: UserDatabase
  authenticator: Authenticator
  hashManager: HashManager
  idGenerator: IdGenerator

  constructor(){
    this.userDatabase = new UserDatabase()
    this.authenticator = new Authenticator()
    this.hashManager = new HashManager()
    this.idGenerator = new IdGenerator()
  }

  public async createUser(user: UserInputDTO) {

      const id = this.idGenerator.generate();

      const hashPassword = await this.hashManager.hash(user.password);

      await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

      const accessToken = this.authenticator.generateToken({ id, role: user.role });

      return accessToken;
  }

  public async getUserByEmail(user: LoginInputDTO) {

      const userFromDB = await this.userDatabase.getUserByEmail(user.email);

      const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

      const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

      if (!hashCompare) {
          throw new InvalidPassword()
      }

      return accessToken;
  }

  public login = async (input: LoginInputDTO) => {
    let { email, password} = input

    if(!email || !password) {
      throw new CustomError(400, "falta parametro")
    }

    const user = await this.userDatabase.getUserByEmail(email)

    const hashCompare = await this.hashManager.compareHash(
      password,
      user.getPassword()
    )

    if(!hashCompare){
      throw new InvalidPassword()
    }

    const payload: AuthenticatorData = {
      id: user.getId(),
      role: user.getRole()
    }

    const token = this.authenticator.generateToken(payload)

    return token    
  }
}