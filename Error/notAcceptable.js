export default class NotAcceptable{
    constructor(message){
        this.message = message;
        this.status = 406
        Object.setPrototypeOf(this, NotAcceptable.prototype)
    }
}