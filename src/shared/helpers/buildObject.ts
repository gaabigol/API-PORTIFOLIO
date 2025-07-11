export class BuildObject {
    static build<T>(data: T): Partial<T> {
        const updateObject: Partial<T> = {}
        for (const key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                updateObject[key] = data[key]
            }
        }
        return updateObject
    }
}
