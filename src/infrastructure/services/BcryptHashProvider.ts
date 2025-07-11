import * as bcrypt from 'bcrypt'
import { IHashProvider } from '../../domain/providers/IHashProvider'

export class BcryptHashProvider implements IHashProvider {
    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt())
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}
