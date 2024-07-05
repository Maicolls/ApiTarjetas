import mysql from 'mysql2/promise'
import db from './database.js';

export default class infoController{
    static async index(req,res){
        let connection;
        try{
            connection = await mysql.createConnection(db)
            const [result] = await connection.execute("SELECT * FROM personaje")
            console.log(result)
            res.json(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{ /*Cierre del ciclo*/
            if(connection){
                await connection.end()
            }
        }
    }

    static async store(req,res){
        let connection;
        try{
            const {title, description, img,leftColor,rightColor} = req.body
            connection = await mysql.createConnection(db)
            console.log(title, description, img,leftColor,rightColor)
            const [result] = await connection.execute("INSERT INTO personaje (title, description, img,leftColor,rightColor) VALUES (?,?,?,?,?)",
            [title, description, img,leftColor,rightColor])
            console.log(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }

   /*  static async details(req,res){
        let connection;
        try{
            const id = req.params.id;
            connection = await mysql.createConnection(db)
            console.log(id)
            const [result] = await connection.execute("SELECT * FROM personaje WHERE id = ?", [id])
            console.log(result)
            res.json(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    } */
}