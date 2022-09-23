export class User {
    constructor(private email: string, private refreshToken: string, private expirationDate: Date) { }

    get expiresDate(): Date {
        return this.expirationDate
    }

}