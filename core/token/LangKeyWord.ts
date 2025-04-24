import { LangKeywordType } from "../enuns/LangKeywordType.ts";

export default class LangKeyWord {

    private static keyWords: Map<string, LangKeywordType> = new Map();

    public static addKeyword(keyword: string, type: LangKeywordType): void {

        if(this.isKeyword(keyword)) {
            console.warn(`A palavra-chave "${keyword}" já está registrada.`);
            return;
        }

        this.keyWords.set(keyword, type);
    }

    public static isKeyword(value: string): boolean {
        return this.keyWords.has(value);
    }

    public static getType(key: string): LangKeywordType | null {
        return this.keyWords.get(key) || null;
    }

   
}

