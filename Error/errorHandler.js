import NotAcceptable from "./notAcceptable.js";
import Conflict from "./conflict.js";

export default function errorHandler (err, req, res, next) {
    if (err instanceof(NotAcceptable)) {
        res.status(406).send({error: err.message});
    } else if (err instanceof(Conflict)) {
        res.status(409).send({error: err.message});
    } else {
        next(err);
    }
}