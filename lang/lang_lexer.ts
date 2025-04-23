import { CodeData } from "./data/data_code.ts";
import { TokenData } from "./data/data_token.ts";
import LangToken, { IPreToken } from "./token/lang_token.ts";

export default class LangLexer {
    code: CodeData;

    constructor(chars: string) {
        this.code = new CodeData(chars, 0);
    }

    public tokenize() {
        const tokens: IPreToken[] = [];

        while (this.code.hasMore) {
            this.code.skipWhitespace();

            let matched = false;

            const layers = [...LangToken.getTokenLayers().entries()].sort((
                a,
                b,
            ) => a[0] - b[0]);

            for (const [_, handlers] of layers) {
                for (const [_, handler] of handlers) {
                    const result = handler(this.code);
                    if (result) {
                        tokens.push(result);
                        matched = true;
                        break;
                    }
                }
                if (matched) break;
            }

            if (!matched) {
                this.code.advance();
            }
        }

        const stream = new TokenData(tokens);
        const finalTokens: any[] = [];

        while (stream.hasMore) {
            const token = stream.current;
            if (token) {
                const normalizer = LangToken.getNormalizer(token.type);

                const refined = normalizer ? normalizer(token, stream) : token;

                finalTokens.push(refined);
                stream.advance();
            }
        }

        return finalTokens;
    }
}
