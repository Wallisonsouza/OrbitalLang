import CodeData from "../data/CodeData.ts";
import TokenData from "../data/TokenData.ts";
import IProcessedToken from "../interfaces/IProcessedToken.ts";
import IUnprocessedToken from "../interfaces/IUnprocessedToken.ts";
import LangToken from "../token/LangToken.ts";

export default class LangLexer {
    code: CodeData;

    constructor(chars: string) {
        this.code = new CodeData(chars, 0);
    }

    public tokenize() {
        const unprocessedTokens: IUnprocessedToken[] = [];

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
                        unprocessedTokens.push(result);
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

        const stream = new TokenData(unprocessedTokens);
        const processedTokens: IProcessedToken[] = [];

        while (stream.hasMore) {
            const token = stream.current;
            if (token) {
                const normalizer = LangToken.getNormalizer(token.type);

                const processed = normalizer ? normalizer(token, stream) : token;

                processedTokens.push(processed);
                stream.advance();
            }
        }

        return processedTokens;
    }
}
