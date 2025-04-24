import Stack from "./Stack.ts";

export default class CodeData extends Stack {
    chars: string;
  
    constructor(chars: string, index: number = 0) {
        super();
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

}