import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function handler(req, res) {
  const method = req?.method;
  const id = parseInt(req?.query?.id);
  const body = req?.body;

  switch (method) {
    case "POST":
      await postMethod(id, res);
      break;

    case "PUT":
      await putMethod(id, body, res);
      break;

    case "DELETE":
      await deleteMethod(id, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  const jsonFile = path.resolve("./", "db.js");
}

async function putMethod() {
  try {
    const data = await readFile(jsonFile);
    await delay(1000);
    const speakers = JSON.parse(data).speakers;
    if (speakers) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(speakers);
    }
    res.status(200).json(speakers);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}
