import CodeData from "../data/CodeData.ts";
import TokenData from "../data/TokenData.ts";
import { LangLayer } from "../enuns/LangLayer.ts";
import IProcessedToken from "../interfaces/IProcessedToken.ts";
import IUnprocessedToken from "../interfaces/IUnprocessedToken.ts";

type TokenHandler = (data: CodeData) => IUnprocessedToken | null;
type NormalizeTokenHandler = (token: IUnprocessedToken, data: TokenData) => IProcessedToken | null;

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
