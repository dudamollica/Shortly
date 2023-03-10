import db from "../config/database.js";

export async function userData(req,res){
    const token = res.locals.section
    const user = await (await db.query(
    `SELECT users.id, users.name, SUM(urls."visitCount") AS total_visits
    FROM users
    JOIN sections ON users.id = sections.user_id
    JOIN urls ON users.id = urls.user_id
    WHERE sections.token = '${token}'
    GROUP BY users.id, users.name;
    `
    )).rows[0]

  const userUrls=  await db.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE user_id = ${user.id}`);

  const body = {
        id: user.id,
        name: user.name ,
        visitCount: user.total_visits,
        shortenedUrls: userUrls.rows,
    }
   
    res.status(200).send(body)
}

export async function ranking (req,res){
    const user = await (await db.query(
        `SELECT users.id, users.name, COUNT(urls.url) AS "linksCount" ,SUM(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls ON users.id = urls.user_id
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `
        )).rows

        console.log(user)

    res.status(200).send(user)
}