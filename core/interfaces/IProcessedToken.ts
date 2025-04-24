import IUnprocessedToken from "./IUnprocessedToken.ts";

export default interface IProcessedToken extends IUnprocessedToken {
    subType: string;
}
