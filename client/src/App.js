import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

//pages
import Home from './pages/home';
import About from './pages/About';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import NotFound from './pages/NotFound';

//component
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
    <div className="max-w-screen-md mx-auto pt-20">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path="/articles-List" element={<ArticlesList />} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
