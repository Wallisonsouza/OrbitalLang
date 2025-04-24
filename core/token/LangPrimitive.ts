import LangOptions from "../../LangOptions.ts";
import { LangPrimitiveType } from "../enuns/LangPrimitiveType.ts";

export default class LangPrimitive {
    private static types: Map<string, LangPrimitiveType> = new Map();
    
    public static addPrimitive(keyword: string, type: LangPrimitiveType): void {
        if (this.isType(keyword)) {
            console.warn(`O tipo "${keyword}" já está registrada.`);
            return;
        }   
        
        this.types.set(keyword, type);

        if(LangOptions.debugMode) {
            console.log(`Tipo "${keyword}" registrado com sucesso.`);
        }
    }

    public static isType(value: string): boolean {
        return this.types.has(value);
    }

    public static getSubType(value: string): LangPrimitiveType | null {
        return this.types.get(value) || null;
    }

}
