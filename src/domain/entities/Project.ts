export class Project {
    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly title: string,
        public readonly titleEn: string,
        public readonly description: string,
        public readonly descriptionEn: string,
        public readonly image: string,
        public readonly technologies: string[],
        public readonly technologiesEn: string[],
        public readonly category: string,
        public readonly categoryEn: string,
        public readonly repository: string,
        public readonly demo: string,
        public readonly featured: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
