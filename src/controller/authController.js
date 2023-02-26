import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const emailExist = await db.query(`SELECT id,password FROM users WHERE email='${email}'`);
    if (emailExist.rows.length === 0) return res.status(401).send("Email or password incorrect");
    const comparePassword = bcrypt.compareSync(password, emailExist.rows[0].password);
    if (!comparePassword) return res.status(401).send("Email or password incorrect");

    const token = uuidv4();

    const sectionExist = await db.query(`SELECT user_id FROM sections WHERE user_id='${emailExist.rows[0].id}'`);
    if (sectionExist.rows.length > 0) {
      await db.query(
        `UPDATE sections SET token='${token}' WHERE user_id=${emailExist.rows[0].id}`
      );
    } else {
    await db.query(
      `INSERT INTO sections (user_id, token, "createdAt") VALUES (${emailExist.rows[0].id}, '${token}', now())`
    );
    }

    res.status(200).send({ token: token });
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  const emailExist = await db.query(
    `SELECT * FROM users WHERE email='${email}'`
  );
  if (emailExist.rows.length > 0) return res.status(409).send("Email exist");

  const passwordHashed = bcrypt.hashSync(password, 10);

  await db.query(
    `INSERT INTO users (name, email, password, "createdAt") VALUES ('${name}','${email}','${passwordHashed}', now())`
  );

  res.status(201).send("Sign-up");
}
