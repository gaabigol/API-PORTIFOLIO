export class Experience {
    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly title: string,
        public readonly titleEn: string,
        public readonly company: string,
        public readonly companyEn: string,
        public readonly location: string,
        public readonly locationEn: string,
        public readonly period: string,
        public readonly periodEn: string,
        public readonly website: string,
        public readonly type: string,
        public readonly description: string,
        public readonly descriptionEn: string,
        public readonly achievements: string[],
        public readonly achievementsEn: string[],
        public readonly technologies: string[],
        public readonly technologiesEn: string[],
        public readonly updatedAt: Date
    ) {}
}
