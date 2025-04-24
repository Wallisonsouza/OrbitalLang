export default class Stack {
    public index: number = 0;
    protected indexStack: number[] = [];

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