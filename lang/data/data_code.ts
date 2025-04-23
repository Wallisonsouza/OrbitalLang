export class CodeData {
    chars: string;
    index: number;
    private indexStack: number[] = [];

    constructor(chars: string, index: number = 0) {
        this.chars = chars;
        this.index = index;
    }

    public get hasMore(): boolean {
        return this.index < this.chars.length;
    }

    public get current(): string {
        return this.hasMore ? this.chars[this.index] : "END";
    }

    public skipWhitespace(): void {
        while (this.hasMore && /\s/.test(this.current)) {
            this.advance();
        }
    }

    public advance(): void {
        if (this.hasMore) {
            this.index++;
        }
    }

    public advanceWhile( test: (char: string) => boolean): string {
        let result = "";
        while (this.hasMore && test(this.current)) {
            result += this.current; 
            this.advance(); 
        }
        return result; 
    }
    

    public peek(offset: number = 1): string {
        const nextIndex = this.index + offset;
        return nextIndex < this.chars.length ? this.chars[nextIndex] : "END";
    }

    // ---- Checkpoint System ----

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

export default CodeData;
