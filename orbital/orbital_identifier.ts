import CodeData from "../lang/data/data_code.ts";
import { LangLayer } from "../lang/enuns/LangLayer.ts";
import LangToken from "../lang/token/lang_token.ts";

export default function initializeOrbitalIdentifiers() {

    LangToken.register(LangLayer.ONE, "IDENTIFIER", (data: CodeData) => {
        const start = /[a-zA-Z_]/;
        const rest = /[a-zA-Z0-9_]/;
    
        if (!data.hasMore || !start.test(data.current)) {
            return null; 
        }
    
        const startPos = data.index;
        let value = data.current;
        data.advance();
    
        value += data.advanceWhile(char => rest.test(char));
    
        const endPos = data.index; 
    
        return {
            type: "IDENTIFIER",
            value: value,
            start: startPos,
            end: endPos
        };
    });
}