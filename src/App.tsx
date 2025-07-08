function App() {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to My App</h1>
      <p className="font-bold">This is a simple React application.</p>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert("Button clicked!")}
      >
        Click Me!
      </button>
    </>
  );
}

export default App;
