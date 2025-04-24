import CodeData from "../core/data/CodeData.ts";
import { LangLayer } from "../core/enuns/LangLayer.ts";
import { LangPrimitiveType } from "../core/enuns/LangPrimitiveType.ts";
import LangPrimitive from "../core/token/LangPrimitive.ts";
import LangToken from "../core/token/LangToken.ts";

export default function registerOrbitalTypes() {

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