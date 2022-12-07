const express = require("express");
const app = express();

const jsonParser = express.json();
const cookieParser = require("cookie-parser");

const SQL = require("./sql.js");
const sql = new SQL;

app.set("view engine", "ejs")
app.use(express.static(__dirname + '/views/assets'))
app.use(cookieParser('secret key'))

app.get("/", (request, response) => {
    response.render(__dirname + "/views/index.ejs")
})

app.get("/games/:game", async (request, response) => {
    let Game = request.params["game"];
    if(Game == 1){
        let GameData = await sql.get_quizz(Game);
        response.render(__dirname + `/views/game.ejs`, {Game: Game, question: GameData.question, answers: GameData.answers, correct: GameData.correct_answer, value: GameData.value})    
    }
    else{
        let GameData = await sql.get_quizz(Game);
        response.render(__dirname + `/views/game2.ejs`, {Game: Game, question: GameData.question, answer: GameData.correct_answer, value: GameData.value})
    }
})

app.get("/games", (request, response) => {
    response.render(__dirname + "/views/games.ejs")
})

app.get("/shop", (request, response) => {
    response.render(__dirname + "/views/shop.ejs")
})

app.get("/QR", (request, response) => {
    response.render(__dirname + "/views/QR.ejs")
})

app.post("/registration", jsonParser, async(request, response) => {
    let result = await sql.add_user(request.body.email, request.body.password)
    if(result != "Ok"){
        response.json({error: "Email is already in use"})
    }
})

app.post("/authorization", jsonParser, async(request, response) => {
    let result = await sql.log_in(request.body.email, request.body.password)
    if(result != undefined){
        response.cookie('user', result.id, {path: "/", maxAge: 3600 * 1000 * 24, secure: true, samesite: "strict"})
        response.send({status: "ok"})
    }
    else{
        response.json({error: "User not found"})
    }
})

app.post("/points", jsonParser, async(request, response) => {
    let points = await sql.get_points(request.body.id)
    response.send({points: points})
})

app.post("/add_points", jsonParser, async(request, response) => {
    await sql.add_points(request.body.id, request.body.points)
    console.log("Ok")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT} port`)
})