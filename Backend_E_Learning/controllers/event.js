import { db } from "../db.js";

export const createEvent = (req, res) => {
  const { titre, description, datedebut, heuredebut, datefin, heurefin, image } = req.body;

  const insertEventQuery = "INSERT INTO evenement (titre, description, datedebut, heuredebut, datefin, heurefin, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [titre, description, datedebut, heuredebut, datefin, heurefin, image];

  db.query(insertEventQuery, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Event has been created.");
  });
};