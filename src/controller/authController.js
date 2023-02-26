import db from "../config/database.js";
import bcrypt from "bcrypt";

export function signIn(req, res) {
  console.log("signIn");
}

export async function signUp(req, res) {
  const {name, email, password} = req.body

  const emailExist = await db.query(`SELECT * FROM users WHERE email='${email}'`);
  if(emailExist.rows.length > 0) return res.status(409).send("Email exist");

  const passwordHashed = bcrypt.hashSync(password, 10)

  await db.query(
    `INSERT INTO users (name, email, password) VALUES ('${name}','${email}','${passwordHashed}')`
  );

  res.status(201).send("Sign-up");
}
