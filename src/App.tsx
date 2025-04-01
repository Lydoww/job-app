import JobLists from "./components/JobLists";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="font-bold text-3xl flex justify-center mb-5">Job App</div>
      <main>
        <JobLists />
      </main>
    </div>
  );
}

export default App;
