import Todolist from './Components/todoComponent'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todolist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
