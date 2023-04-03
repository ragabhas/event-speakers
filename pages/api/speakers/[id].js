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
  const jsonFile = path.resolve("./", "db.js");
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

  async function putMethod() {
    try {
      const data = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(data).speakers;
      if (speakers) {
        const newSpeakers = speakers.map((speaker) => {
          return speaker.id === id ? body : speaker;
        });

        writeFile(jsonFile, JSON.stringify({ speakers: newSpeakers }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(body, null, 2));
      } else {
        res.status(404);
      }
      res.status(200).json(speakers);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  async function deleteMethod() {
    try {
      const data = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(data).speakers;
      if (speakers) {
        const newSpeakers = speakers.filter((speaker) => {
          return speaker.id != id;
        });

        writeFile(jsonFile, JSON.stringify({ speakers: newSpeakers }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200);
      } else {
        res.status(404);
      }
      res.status(200).json(speakers);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  async function postMethod() {
    try {
      const data = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(data).speakers;
      if (speakers) {
        const maxId = speakers.reduce((max, speaker) => {
          return speaker.id > max ? speaker.id : max;
        }, 0);

        const newId = maxId + 1;
        const newSpeaker = { ...body, id: newId };

        const newSpeakers = [newSpeaker, ...speakers];
        writeFile(jsonFile, JSON.stringify({ speakers: newSpeakers }, null, 2));
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newSpeaker, null, 2));
      } else {
        res.status(404);
      }
      res.status(200).json(speakers);
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }
}
