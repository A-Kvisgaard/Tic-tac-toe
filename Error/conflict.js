export default class Conflict{
    constructor(message){
        this.message = message;
        this.status = 409;
        Object.setPrototypeOf(this, Conflict.prototype)
    }
}