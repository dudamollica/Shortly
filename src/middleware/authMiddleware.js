import db from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Inform token");

  try {
    const checkSection = await db.query(`SELECT * FROM sections WHERE token='${token}'`);
    if(checkSection.rows.length == 0) return res.status(401).send("Unauthorized");
    res.locals.section= checkSection.rows[0].token;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
}
