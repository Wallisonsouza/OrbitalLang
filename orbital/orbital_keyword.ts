import CodeData from "../lang/data/data_code.ts";
import { LangKeywordType } from "../lang/enuns/LangKeywordType.ts";
import { LangLayer } from "../lang/enuns/LangLayer.ts";
import LangKeyWord from "../lang/token/lang_keyword.ts";
import LangToken from "../lang/token/lang_token.ts";

export default function initializeOrbitalKeywords() {
    
    LangKeyWord.addKeyword("const", LangKeywordType.CONSTANT_DECLARATION);
    LangKeyWord.addKeyword("return", LangKeywordType.CONTROL_FLOW);
    LangKeyWord.addKeyword("function", LangKeywordType.FUNCTION_DECLARATION);
    LangKeyWord.addKeyword("var", LangKeywordType.VARIABLE_DECLARATION);
    
    LangToken.register(LangLayer.ZERO, "KEYWORD", (data: CodeData) => {
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

        if (LangKeyWord.isKeyword(value)) {
            data.confirm(); 
            return {
                type: "KEYWORD",
                value,
                start: startPos,
                end: endPos
            };
        }
    
        data.revert(); 
        return null;
    });
}