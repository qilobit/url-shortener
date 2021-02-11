import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateUrlPage from './pages/CreateUrl';
import CreatePastePage from './pages/CreatePastePage';
import HomePage from './pages/HomePage';
import SingleUrl from './pages/SingleUrl';
import SinglePaste from './pages/SinglePaste';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Route path="/_/create-url" exact component={CreateUrlPage} />
        <Route path="/_/create-paste" exact component={CreatePastePage} />
        <Route path="/:url" exact component={SingleUrl} />
        <Route path="/paste/:id" exact component={SinglePaste} />
        <Route path="/" exact component={HomePage} />
      </div>
    </Router>

  );
}

export default App;
