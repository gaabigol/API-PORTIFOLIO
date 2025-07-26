export class Article {
    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly title: string,
        public readonly titleEn: string,
        public readonly excerpt: string,
        public readonly excerptEn: string,
        public readonly content: string,
        public readonly contentEn: string,
        public readonly tags: string,
        public readonly tagsEn: string,
        public readonly category: string,
        public readonly categoryEn: string,
        public readonly readTime: string,
        public readonly published: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
