import CodeData from "../lang/data/data_code.ts";
import { LangLayer } from "../lang/enuns/LangLayer.ts";
import { LangSymbolType } from "../lang/enuns/LangSymbolType.ts";
import LangSymbol from "../lang/token/lang_symbol.ts";
import LangToken from "../lang/token/lang_token.ts";

export function initializeOrbitalSymbols() {

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
