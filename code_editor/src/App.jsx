import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Editor from './Editor.jsx';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "green",
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomid" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
