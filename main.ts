import registerOrbitalIdentifiers  from "./orbital/registerOrbitalIdentifiers.ts";
import registerOrbitalKeywords from "./orbital/registerOrbitalKeywords.ts";
import registerOrbitalSymbols from "./orbital/registerOrbitalSymbols.ts";
import registerOrbitalTypes from "./orbital/registerOrbitalTypes.ts";
import LangLexer from "./core/lexer/LangLexer.ts";
import { registerOrbitalOperators } from "./orbital/registerOrbitalOperators.ts";
import LangOptions from "./LangOptions.ts";

LangOptions.debugMode = true;

registerOrbitalKeywords();
registerOrbitalIdentifiers();
registerOrbitalSymbols();
registerOrbitalTypes();
registerOrbitalOperators();



const code = `

    fn test(a: int, b: int): int {
        +
    }
`;

const lexer = new LangLexer(code);
const tokens = lexer.tokenize();  
console.log(tokens)