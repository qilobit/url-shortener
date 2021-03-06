import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CreateUrlPage from './pages/CreateUrl';
import CreatePastePage from './pages/CreatePastePage';
import HomePage from './pages/HomePage';
import SingleUrl from './pages/SingleUrl';
import SinglePaste from './pages/SinglePaste';
import NotFoundPage from './pages/NotFoundPage';
import MyUrlsPage from './pages/MyUrls';
import CreateAdPage from './pages/CreateAd';

function App() {
  return (
    <Router>
      <div className="">
          <Header />
          <div className="container">
            <Route path="/" exact component={HomePage} />
            <Route path="/_/create-url" exact component={CreateUrlPage} />
            <Route path="/_/create-paste" exact component={CreatePastePage} />
            <Route path="/_/create-ad" exact component={CreateAdPage} />
            <Route path="/:url" exact component={SingleUrl} />
            <Route path="/paste/:id" exact component={SinglePaste} />
            <Route path="/_/my-urls" exact component={MyUrlsPage} />
            <Route path="/not-found" component={NotFoundPage} />
          </div>        
      </div>
    </Router>

  );
}

export default App;
