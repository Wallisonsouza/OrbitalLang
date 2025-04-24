import initializeOrbitalIdentifiers from "./orbital/orbital_identifier.ts";
import initializeOrbitalKeywords from "./orbital/orbital_keyword.ts";
import { initializeOrbitalSymbols } from "./orbital/orbital_symbol.ts";
import { initializeOrbitalTypes } from "./orbital/orbital_type.ts";
import LangLexer from "./core/token/LangLexer.ts";

initializeOrbitalKeywords();
initializeOrbitalIdentifiers();
initializeOrbitalSymbols();
initializeOrbitalTypes();

const code = `

    fn test(a: int, b: int): int {

    }
`;


const lexer = new LangLexer(code);
const tokens = lexer.tokenize();  
console.log(tokens)