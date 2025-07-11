export interface IHashProvider {
    compare(raw: string, hashed: string): Promise<boolean>
    hash(value: string): Promise<string>
}
