import db from "../config/database.js";
import { customAlphabet } from "nanoid";

export async function shortenUrl (req,res){
    const token = res.locals.section
    const {url} = req.body

    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);
    const shortLink = nanoid();
    const userId = await db.query(`SELECT (user_id) FROM sections WHERE token='${token}'`)
    const id = userId.rows[0].user_id
 
    await db.query(`INSERT INTO urls (url, "shortUrl", "visitCount", user_id, "createdAt") VALUES 
    ('${url}', '${shortLink}', 0, ${id}, now())`)

    res.status(201).send({id:id, shortUrl: shortLink})
}

export async function getUrl(req, res){
 const {id} =  req.params
 const body = await db.query(`SELECT id,"shortUrl",url FROM urls WHERE id=${id}`)
 if(body.rows.length == 0) return res.status(404).send("Not found")
 res.status(200).send(body.rows[0])
}