import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/note";
const router = Router();

router.post("/create", createNote);

router.patch("/:noteId", updateNote);

router.delete("/:noteId", deleteNote);

router.get("/", getAllNotes);
router.get("/:noteId", getSingleNote);

export default router;
