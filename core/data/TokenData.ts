import IUnprocessedToken from "../interfaces/IUnprocessedToken.ts";
import Stack from "./Stack.ts";

export default class TokenData extends Stack {
    private tokens: IUnprocessedToken[];

    constructor(tokens: IUnprocessedToken[]) {
        super();
        this.tokens = tokens;
    }

    public get hasMore(): boolean {
        return this.index < this.tokens.length;
    }

    public get current(): IUnprocessedToken | null {
        return this.hasMore ? this.tokens[this.index] : null;
    }

    public peek(offset: number = 1): IUnprocessedToken | null {
        const nextIndex = this.index + offset;
        return nextIndex < this.tokens.length ? this.tokens[nextIndex] : null;
    }

    public get previous(): IUnprocessedToken | null{
        return this.index > 0 ? this.tokens[this.index - 1] : null;
    }

    public advance(): void {
        if (this.hasMore) {
            this.index++;
        }
    }
}
