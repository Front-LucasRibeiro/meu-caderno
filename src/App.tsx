import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header title="Meu Caderno" isAuthenticated={true} username="Lucas" />
    </div>
  );
}

export default App;
