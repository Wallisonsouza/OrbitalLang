import CodeData from "../lang/data/data_code.ts";
import { LangLayer } from "../lang/enuns/LangLayer.ts";
import { LangOperatorType } from "../lang/enuns/LangOperatorType.ts";
import LangOperator from "../lang/token/lang_operator.ts";
import LangToken from "../lang/token/lang_token.ts";

export function initializeOrbitalOperators() {

    // LangOperator.addOperator("/", LangOperatorType.DIVISION);
    // LangOperator.addOperator("*", LangOperatorType.MULTIPLICATION);
    // LangOperator.addOperator("+", LangOperatorType.EQUALS);
    // LangOperator.addOperator("-", LangOperatorType.SUBTRACTION);

    // LangToken.addToken(LangLayer.TWO, "OPERATOR", (data: CodeData) => {
    //     if (data.hasMore) {
    //         data.mark();

    //         let value = data.current;
    //         const start = data.index;
    //         data.advance();

    //         if (data.hasMore && LangOperator.isOperator(value + data.peek(1))) {
    //             value += data.peek(1);
    //             data.advance();
    //         }

    //         if (LangOperator.isOperator(value)) {
    //             data.confirm();

    //             return {
    //                 type: "OPERATOR",
    //                 value,
    //                 start: start,
    //                 end: 
    //             };
    //         }

    //         data.revert();
    //     }

    //     return null;
    // });

}
