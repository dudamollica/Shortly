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

export async function redirectUrl(req,res){
 const {shortUrl} = req.params
 const shortUrlExist = await db.query(`SELECT * FROM urls WHERE "shortUrl"='${shortUrl}'`)
 if(shortUrlExist.rows.length == 0) return res.status(404).send("NOT FOUND")
 await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"='${shortUrl}'`)
 const url = shortUrlExist.rows[0].url
 res.redirect(url);
}

export async function deleteUrl(req,res){
    const token = res.locals.section
    const {id} =  req.params
    const idUser = await (await db.query(`SELECT user_id FROM sections WHERE token='${token}'`)).rows[0].user_id
    const idUrlOwner = await (await db.query(`SELECT user_id FROM urls WHERE id='${id}'`)).rows[0]
    
    if(!idUrlOwner) return res.status(404).send("This URL does not exist")
    if(idUser != idUrlOwner.user_id) return res.status(401).send("This Url belongs to another user")
    
    await db.query(`DELETE FROM urls WHERE id=${id}`)
    res.status(204).send("Delete complete")
}