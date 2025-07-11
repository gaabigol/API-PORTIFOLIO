import { PlaygroundEndpoint } from './PlaygroundEndpoint'

export class PlaygroundProject {
    constructor(
        id: number,
        name: string,
        uuid: string,
        nameEn: string,
        description: string,
        descriptionEn: string,
        baseUrl: string,
        version: string,
        color: string,
        icon: string,
        active: boolean,
        createdAt: Date,
        updatedAt: Date,
        endpoints: PlaygroundEndpoint[]
    ) {}
}
