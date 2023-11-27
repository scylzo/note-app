import {
  useState,
  useEffect,
  ChangeEventHandler,
  FocusEventHandler,
} from "react";
import NoteItem from "./components/NoteItem";
import axios from "axios";

type noteType = { id: string; title: string; description?: string };

const App = () => {
  const [notes, setNotes] = useState<noteType[]>([]);
  const [noteToView, setNoteToView] = useState<noteType>();

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [selectedNoteId, setSelectedNoteId] = useState("");

  useEffect(() => {
    const getAllNotes = async () => {
      const { data } = await axios("http://localhost:8000/note");
      setNotes(data.notes);
    };

    getAllNotes();
  }, []);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: FocusEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (selectedNoteId) {
      const { data } = await axios.patch(
        "http://localhost:8000/note/" + selectedNoteId,
        {
          title: values.title,
          description: values.description,
        }
      );
      const updatedNotes = notes.map((note) => {
        if (note.id === selectedNoteId) {
          (note.title = data.note.title),
            (note.description = data.note.description);
        }
        return note;
      });
      setNotes([...updatedNotes]);
      setValues({ title: "", description: "" });
      return;
    }
    const { data } = await axios.post("http://localhost:8000/note/create", {
      title: values.title,
      description: values.description,
    });
    setNotes([data.note, ...notes]);
    setValues({ title: "", description: "" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white space-y-6 ">
      <form
        className="space-y-6  shadow-md rounded p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-2xl"> Note Application </h1>
        <div>
          <input
            className="w-full border-b-2 border-gray-700 outline-none"
            type="text"
            placeholder="Title"
            value={values.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            placeholder="Description"
            value={values.description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-right">
          <button className="bg-blue-600 rounded text-white py-2 px-5">
            Submit
          </button>
        </div>
      </form>
      {/* Note Items */}

      {notes?.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          description={
            noteToView?.id === note.id ? noteToView?.description : ""
          }
          onViewClick={() => {
            if (noteToView) {
              setNoteToView(undefined);
            } else setNoteToView(note);
          }}
          onEditClick={() => {
            setSelectedNoteId(note.id);
            setValues({
              title: note.title,
              description: note.description || "",
            });
          }}
          onDeleteClick={async () => {
            if (confirm("Are you sure you want to delete this note ?")) {
              await axios.delete("http://localhost:8000/note/" + note.id);
              const updatedNotes = notes.filter(({ id }) => id !== note.id);
              setNotes([...updatedNotes]);
            }
          }}
        />
      ))}
    </div>
  );
};

export default App;
