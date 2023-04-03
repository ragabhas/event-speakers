import path from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function handler(req, res) {
  const jsonFile = path.resolve("./", "db.js");
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
