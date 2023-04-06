import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Results, Error } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='results/:topicName' element={<Results />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
