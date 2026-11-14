import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/home'
import Results from './Pages/Results'
import RecipeDetail from './Pages/RecipeDetail'
import Pantry from './Pages/Pantry'



export default function App() {
  return (
    <main>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        {/* Dynamic route: ":id" is a placeholder, e.g. /recipes/52772 */}
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/pantry" element={<Pantry />} />
      </Routes>
    </main>
  )
}
