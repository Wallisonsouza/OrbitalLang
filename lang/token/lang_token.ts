import CodeData from "../data/data_code.ts";
import { TokenData } from "../data/data_token.ts";
import { LangLayer } from "../enuns/LangLayer.ts";


type TokenHandler = (data: CodeData) => IPreToken | null;
type NormalizeTokenHandler = (token: IPreToken, data: TokenData) => IToken | null;


export interface IPreToken {
    value: string;
    type: string;
    start: number;
    end: number;
}

export interface IToken extends IPreToken {
    subType: string;
}

class LangToken {
    private static tokenLayers: Map<number, [string, TokenHandler][]> = new Map();
    private static normalizers: Map<string, NormalizeTokenHandler> = new Map();

    public static register(layer: LangLayer, name: string, handler: TokenHandler) {
        if (!this.tokenLayers.has(layer)) {
            this.tokenLayers.set(layer, []);
        }
        this.tokenLayers.get(layer)!.push([name, handler]);
    }

    public static getTokenLayers(): Map<number, [string, TokenHandler][]> {
        return this.tokenLayers;
    }

    public static normalize(name: string, handler: NormalizeTokenHandler) {
        if (this.normalizers.has(name)) {
            console.warn(`Normalizador para "${name}" já registrado.`);
            return;
        }
        this.normalizers.set(name, handler);
    }

    public static getNormalizer(name: string): NormalizeTokenHandler | undefined {
        return this.normalizers.get(name);
    }
}

export default LangToken;
