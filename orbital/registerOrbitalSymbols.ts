import CodeData from "../core/data/CodeData.ts";
import { LangLayer } from "../core/enuns/LangLayer.ts";
import { LangSymbolType } from "../core/enuns/LangSymbolType.ts";
import LangSymbol from "../core/token/LangSymbol.ts";
import LangToken from "../core/token/LangToken.ts";

export default function registerOrbitalSymbols() {

    LangSymbol.addSymbol("(",  LangSymbolType.PAREN_OPEN);
    LangSymbol.addSymbol(")", LangSymbolType.PAREN_CLOSE);
    LangSymbol.addSymbol(":", LangSymbolType.COLON);
    LangSymbol.addSymbol("{", LangSymbolType.BRACE_OPEN);
    LangSymbol.addSymbol("}", LangSymbolType.BRACE_CLOSE);

    LangToken.register(LangLayer.TWO, "SYMBOL", (data: CodeData) => {
        if (data.hasMore) {
            data.mark();

            const start = data.index;
            const currentChar = data.current;

            if (LangSymbol.isSymbol(currentChar)) {
                data.advance();
                data.confirm(); 

                const end = data.index;

                return {
                    type: "SYMBOL",
                    value: currentChar,
                    start: start,
                    end: end,
                };
            }

            data.revert(); 
        }

        return null;
    });
}
