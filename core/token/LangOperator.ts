import LangOptions from "../../LangOptions.ts";
import { LangOperatorType } from "../enuns/LangOperatorType.ts";

export default class LangOperator {
    private static operators = new Map<string, LangOperatorType>();

    public static isOperator(value: string): boolean {
        return this.operators.has(value);
    }

    public static addOperator(symbol: string, type: LangOperatorType): void {
        
        if (this.isOperator(symbol)) {
            console.warn(`O operador "${symbol}" já está registrado.`);
            return;
        }
       
        this.operators.set(symbol, type);

        if(LangOptions.debugMode) {
            console.log(`Operador "${symbol}" adicionado com sucesso.`);
        }
    }

    public static getOperatorType(value: string): LangOperatorType | null {
        return this.operators.get(value) || null;
    }
}