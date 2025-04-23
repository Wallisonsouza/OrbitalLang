import CodeData from "../lang/data/data_code.ts";
import { LangLayer } from "../lang/enuns/LangLayer.ts";
import { LangPrimitiveType } from "../lang/enuns/LangPrimitiveType.ts";
import LangToken from "../lang/token/lang_token.ts";
import LangPrimitive from "../lang/token/lang_types.ts";

export function initializeOrbitalTypes() {

    LangPrimitive.addPrimitive("int", LangPrimitiveType.NUMBER);
    LangPrimitive.addPrimitive("str", LangPrimitiveType.STRING);

    LangToken.register(LangLayer.ZERO, "TYPE", (data: CodeData) => {
        const regex = /[a-zA-Z]/;
    
        if (!data.hasMore || !regex.test(data.current)) {
            return null;
        }
    
        data.mark();
    
        const startPos = data.index;
        let value = data.current;
        data.advance();
    
        value += data.advanceWhile(char => regex.test(char));
    
        const endPos = data.index; 
    
        if (LangPrimitive.isType(value)) {
            data.confirm();
            return {
                type: "TYPE",
                value,
                start: startPos,
                end: endPos
            };
        }
    
        data.revert();
        return null;
    });
}