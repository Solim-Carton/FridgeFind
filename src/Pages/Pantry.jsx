import { Link } from 'react-router-dom'
import { usePantry } from '../Context/Pantrycontext'

export default function Pantry() {
  // No fetch here: this data comes from Context
  const { favorites, toggleFavorite } = usePantry()

  if (favorites.length === 0) return <p className="empty">Nothing saved yet. <Link to="/">Find a recipe</Link></p>

  return (
    <ul className="list">
      {favorites.map((f) => (
        <li key={f.id}>
          <Link to={`/recipes/${f.id}`}>{f.name}</Link>
          <button className="txt" onClick={() => toggleFavorite(f)}>remove</button>
        </li>
      ))}
    </ul>
  )
}