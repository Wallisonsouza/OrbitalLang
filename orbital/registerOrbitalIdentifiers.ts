import CodeData from "../core/data/CodeData.ts";
import { LangLayer } from "../core/enuns/LangLayer.ts";
import IUnprocessedToken from "../core/interfaces/IUnprocessedToken.ts";
import LangToken from "../core/token/LangToken.ts";

export default function registerOrbitalIdentifiers() {

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
        
        const result: IUnprocessedToken = {
            type: "IDENTIFIER",
            value: value,
            start: startPos,
            end: endPos
        };

        return result;
    });
}