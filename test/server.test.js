import app from "../server.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { expect } = chai;

describe('Get /', () => {
    it('Should return game state', () =>{
        chai.request(app)
        .get("/")
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body).to.be.json;
            console.log(res.body);
        })
        .catch(err => { throw err });
        
    })
})

describe('POST /:piece', () =>{
    it('Should place X as first piece', ()=>{
        chai.request(app)
        .post('/x')
        .send({"x": 0,"y": 0})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.board[0][0]).to.equal('X')
            expect(res.body.currentTurn).to.equal('O')
        })
        .catch(err => { throw err })

    })
    it('Should\'nt allow X as second piece', ()=>{
        chai.request(app)
        .post('/x')
        .send({"x": 0,"y": 0})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(406);
        })
        .catch(err => { throw err })
    })
    it('Should place O as second piece', ()=>{
        chai.request(app)
        .post('/o')
        .send({"x": 1,"y": 1})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.board[1][1]).to.equal('O')
        })
        .catch(err => { throw err })
    })
    it('Should place 3 more pieces', ()=>{
        let moves = [{"x": 0,"y": 1},{"x": 2,"y": 2},{"x": 0,"y": 2}];
        for (let [index, move] of moves.entries()){
            let piece = (index % 2  == 0) ? 'x' : 'o';
            chai.request(app)
            .post(`/${piece}`)
            .send({"x": move.x,"y": move.y})
            .set('Content-Type', 'application/json')
            .then(res => { 
                expect(res).to.have.status(200);
                expect(res.body.board[move.x][move.y]).to.equal(piece)
            })
            .catch(err => { throw err })
        }
    })
    it('Should not allow placing piece on finished game', ()=>{
        chai.request(app)
        .post('/o')
        .send({"x": 2,"y": 0})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(406);
        })
        .catch(err => { throw err })
    })
})

describe('POST /restart', () => {
    it('Should add 1 point to X after won game', () =>{
        chai.request(app)
        .post('/restart')
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.score.x).to.equal(1);
            expect(res.body.score.x).to.equal(0);
            expect(res.body.board).to.equal([['', '', ''],['', '', ''],['', '', '']])
        })
        .catch(err => { throw err })
    })

    it('Should only clear board after unfinnished game', () =>{
        chai.request(app)
        .post('/x')
        .send({"x": 0,"y": 0})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.board[0][0]).to.equal('X')
            expect(res.body.currentTurn).to.equal('O')
        })
        .catch(err => { throw err })

        chai.request(app)
        .post('/restart')
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.score.x).to.equal(1);
            expect(res.body.score.x).to.equal(0);
            expect(res.body.board).to.equal([['', '', ''],['', '', ''],['', '', '']])
        })
        .catch(err => { throw err })
    })
})

describe('DELETE /', () => {
    it('Should clear score and board', ()=>{
        chai.request(app)
        .post('/x')
        .send({"x": 0,"y": 0})
        .set('Content-Type', 'application/json')
        .then(res => { 
            expect(res).to.have.status(200);
            expect(res.body.board[0][0]).to.equal('X')
            expect(res.body.currentTurn).to.equal('O')
            expect(res.body.score.x).to.equal(1);
            expect(res.body.score.x).to.equal(0);
        })
        .catch(err => { throw err })
        
        chai.request(app)
        .delete('/')
        .set('Content-Type', 'application/json')
        .then(res => {
            expect(res.body.score.x).to.equal(0);
            expect(res.body.score.x).to.equal(0);
            expect(res.body.board).to.equal([['', '', ''],['', '', ''],['', '', '']])
        })
    })
})