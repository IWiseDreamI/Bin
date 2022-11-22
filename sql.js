const mysql = require("mysql2");

const db = {
    host: "localhost",
    user: "root",
    database: "smart_retail",
    password: ""
};

const connection = mysql.createPool(db);

class SQL{
    async add_user(email, password){
        let user = [email, password]
        let result = await new Promise( data => { 
            connection.query(`INSERT INTO users(email, password) VALUES (?, ?)`, user, (error, result) => {
                if(error){
                    console.log(error)
                    throw error
                }
                else{
                    data("Ok")
                }
            })
        })
        return result;
    }

    async log_in(email, password){
        let user = [email, password]
        let result = await new Promise(data => {
            connection.query(`SELECT * FROM users WHERE email = ? AND password = ?`, user, (error, result) => {
                if(error){
                    console.log(error)
                    throw error
                }
                try{
                    data(result);
                }
                catch{
                    data({});
                    throw error;
                }
            })
        })
        return result[0]
    }
    
    async get_quizz(quizz_id){
        let result = await new Promise(data => {
            connection.query(`SELECT * FROM quizz WHERE id = ?`, [quizz_id], (error, result) => {
                if(error){
                    console.log(error)
                    throw error
                }
                try{
                    data(result);
                }
                catch{
                    data({});
                    throw error;
                }
            })
        })
        return result[0]
    }

    async add_points(id, points){
        let user_points = await this.get_points(id)
        console.log(user_points)
        points = Number(points) + Number(user_points) 
        await new Promise(data => {
            connection.query(`UPDATE users SET points = ? WHERE id = ?`, [points, id], (error, response) => {
                if(error){
                    console.log(error)
                    throw error
                }
                try{
                    data(response);
                }
                catch{
                    data({});
                    throw error;
                }
            })
        })
        console.log("YES")
    }

    async get_points(id){
        let result = await new Promise(data => {
            connection.query(`SELECT points FROM users WHERE id = ?`, [id], (error, response) => {
                if(error){
                    console.log(error)
                    throw error
                }
                try{
                    data(response);
                }
                catch{
                    data({});
                    throw error;
                }
            })
        })
        return result[0].points
    }
}

module.exports = SQL