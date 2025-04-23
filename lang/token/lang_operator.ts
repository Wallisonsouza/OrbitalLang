import { LangOperatorType } from "../enuns/LangOperatorType.ts";

export default class LangOperator {
    private static operators = new Map<string, LangOperatorType>();

    public static isOperator(value: string): boolean {
        return this.operators.has(value);
    }

    public static addOperator(symbol: string, type: LangOperatorType): void {
        if (!this.isOperator(symbol)) {
            this.operators.set(symbol, type);
            console.log(`Operador "${symbol}" adicionado com sucesso.`);
        } else {
            console.warn(`O operador "${symbol}" já está registrado.`);
        }
    }

    public static getOperatorType(value: string): LangOperatorType | null {
        return this.operators.get(value) || null;
    }
}