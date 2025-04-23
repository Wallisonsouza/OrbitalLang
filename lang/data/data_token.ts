import { IPreToken } from "../token/lang_token.ts";

export class TokenData {
    private tokens: IPreToken[];
    private index: number = 0;
    private indexStack: number[] = [];

    constructor(tokens: IPreToken[]) {
        this.tokens = tokens;
    }

    public get hasMore(): boolean {
        return this.index < this.tokens.length;
    }

    public get current(): IPreToken | null {
        return this.hasMore ? this.tokens[this.index] : null;
    }

    public peek(offset: number = 1): IPreToken | null {
        const nextIndex = this.index + offset;
        return nextIndex < this.tokens.length ? this.tokens[nextIndex] : null;
    }

    public get previous(): IPreToken | null{
        return this.index > 0 ? this.tokens[this.index - 1] : null;
    }

    public advance(): void {
        if (this.hasMore) {
            this.index++;
        }
    }

    // --- Checkpoint System ---
    public mark(): void {
        this.indexStack.push(this.index);
    }

    public revert(): void {
        if (this.indexStack.length > 0) {
            this.index = this.indexStack.pop()!;
        }
    }

    public confirm(): void {
        if (this.indexStack.length > 0) {
            this.indexStack.pop();
        }
    }
}
