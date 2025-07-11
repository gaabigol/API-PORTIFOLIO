import { PlaygroundProject } from './PlaygroundProject'

export class PlaygroundEndpoint {
    constructor(
        public readonly id: number,
        public readonly projectId: number,
        public readonly uuid: string,
        public readonly name: string,
        public readonly nameEn: string,
        public readonly description: string,
        public readonly descriptionEn: string,
        public readonly path: string,
        public readonly method: string,
        public readonly requestExample: string,
        public readonly responseExample: string,
        public readonly parameters: any[],
        public readonly active: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly project: PlaygroundProject
    ) {}
}
