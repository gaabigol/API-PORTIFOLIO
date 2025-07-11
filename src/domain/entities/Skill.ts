export class Skill {
    constructor(
        public readonly id: number,
        public readonly uuid: string,
        public readonly name: string,
        public readonly category: string,
        public readonly icon: string,
        public readonly color: string,
        public readonly createdAt: Date
    ) {}
}
