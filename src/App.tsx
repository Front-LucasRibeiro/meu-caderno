import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from './routes';

function App() {
  return (
    <div className="App">
      <Header title="Meu Caderno" isAuthenticated={true} username="Lucas" />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
}

export default App;
