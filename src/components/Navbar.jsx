import { Link, NavLink } from 'react-router-dom'
import { usePantry } from '../Context/Pantrycontext'

export default function Navbar() {
  const { favorites } = usePantry() // shared data: the count updates when you save

  return (
    <header>
      <Link className="logo" to="/">fridgefind</Link>
      <nav>
        <NavLink to="/" end>fridge</NavLink>
        <NavLink to="/pantry">saved{favorites.length > 0 ? ` ${favorites.length}` : ''}</NavLink>
      </nav>
    </header>
  )
}
