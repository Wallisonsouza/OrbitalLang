import LangOptions from "../../LangOptions.ts";
import { LangSymbolType } from "../enuns/LangSymbolType.ts";

export default class LangSymbol {
    private static simbols = new Map<string, LangSymbolType>();

    public static isSymbol(value: string): boolean {
        return this.simbols.has(value);
    }

    public static getSymbolSubType(value: string): LangSymbolType | null {
        return this.simbols.get(value) || null;
    }

    public static addSymbol(symbol: string, type: LangSymbolType): void {
        if (this.isSymbol(symbol)) {
            console.warn(`O símbolo "${symbol}" já está registrado.`);
            return;
        } 

        this.simbols.set(symbol, type);

        if(LangOptions.debugMode) {
            console.log(`Símbolo "${symbol}" adicionado com sucesso.`);
        }
    }
}
