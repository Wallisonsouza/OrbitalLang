import CodeData from "../core/data/CodeData.ts";
import { LangLayer } from "../core/enuns/LangLayer.ts";
import { LangOperatorType } from "../core/enuns/LangOperatorType.ts";
import LangOperator from "../core/token/LangOperator.ts";
import LangToken from "../core/token/LangToken.ts";

export function registerOrbitalOperators() {

    LangOperator.addOperator("/", LangOperatorType.DIVISION);
    LangOperator.addOperator("*", LangOperatorType.MULTIPLICATION);
    LangOperator.addOperator("+", LangOperatorType.ADDITION);
    LangOperator.addOperator("-", LangOperatorType.SUBTRACTION);

    LangToken.register(LangLayer.TWO, "OPERATOR", (data: CodeData) => {
        if (data.hasMore) {
            data.mark();


            const start = data.index;
            const currentChar = data.current;

            if (LangOperator.isOperator(currentChar)) {
                data.advance();
                data.confirm();

                const end = data.index;

                return {
                    type: "OPERATOR",
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
