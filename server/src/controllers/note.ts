import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

export interface IncomingBody {
  title: string;
  description?: string;
}

export const createNote: RequestHandler = async (req, res) => {
  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.send("note created");
};

export const updateNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const { title, description } = req.body as IncomingBody;
  const note = await Note.findByIdAndUpdate(
    noteId,
    {
      title,
      description,
    },
    { new: true }
  );

  if (!note) return res.json({ error: "Note not found !" });

  res.send({ note });
};

export const deleteNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

  if (!note) return res.json({ error: "Note not found !" });

  res.send({ message: "Note deleted !" });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.send({ notes });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) return res.json({ error: "Note not found !" });
  res.send({ note });
};
