import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchByIngredients } from '../services/mealApi'

export default function Results() {
  const [params] = useSearchParams()
  const query = params.get('ingredients') || '' 

  
  const [recipes, setRecipes] = useState([])
  const [status, setStatus] = useState('loading') 

  
  useEffect(() => {
    const ingredients = query.split(',').map((s) => s.trim()).filter(Boolean)
    if (ingredients.length === 0) {
      setStatus('done')
      return
    }

    let stale = false 
    setStatus('loading')

    
    searchByIngredients(ingredients)
      .then((data) => {
        if (stale) return
        setRecipes(data)
        setStatus('done')
      })
      .catch(() => !stale && setStatus('error'))

    return () => { stale = true }
  }, [query])

  if (status === 'loading') return <p className="empty">Looking...</p>
  if (status === 'error') return <p className="empty">Recipes did not load. Try again.</p>
  if (recipes.length === 0) return <p className="empty">Nothing matches. <Link to="/">Try other ingredients</Link></p>

  return (
    <ul className="list">
      {recipes.map((r) => (
        <li key={r.id}>
          {/*  */}
          <Link to={`/recipes/${r.id}`}>{r.name}</Link>
          <span className="soft">uses {r.matched}</span>
        </li>
      ))}
    </ul>
  )
}