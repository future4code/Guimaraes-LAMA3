import * as bcrypt from "bcryptjs";


export class HashManager {
    static compareHash(password: string, password1: any) {
        throw new Error("Method not implemented.");
    }
    static compare(password: any) {
        throw new Error("Method not implemented.");
    }

    public async hash(text: string): Promise<string> {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }

    generateHash = async (pass: string) => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(pass, salt)

        return result

    }

    compareHash = async (pass: string, hash: string) => {
        return bcrypt.compare(pass,hash)
}

}