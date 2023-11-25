const App = () => {
  return (
    <div className="max-w-3xl mx-auto shadow-md rounded p-5 bg-white  space-y-6">
      <h1 className="text-center font-bold text-2xl">Note Application</h1>
      <div>
        <input
          className="w-full border-b-2 border-gray-700 outline-none"
          type="text"
          placeholder="Title"
        />
      </div>
      <div>
        <textarea
          className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
          placeholder="Description"
        ></textarea>
      </div>

      <div className="text-right">
        <button className="bg-blue-600 rounded text-white py-2 px-5">
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
