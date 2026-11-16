import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipe } from '../services/mealapi'
import { usePantry } from '../Context/Pantrycontext'

export default function RecipeDetail() {
  const { id } = useParams() 
  const { favorites, toggleFavorite } = usePantry() 

  
  const [recipe, setRecipe] = useState(null)
  const [status, setStatus] = useState('loading') 
  useEffect(() => {
    let stale = false
    setStatus('loading')

    
    getRecipe(id)
      .then((data) => {
        if (stale) return
        setRecipe(data)
        setStatus(data ? 'done' : 'missing')
      })
      .catch(() => !stale && setStatus('error'))

    return () => { stale = true }
  }, [id])

  if (status === 'loading') return <p className="empty">Looking...</p>
  if (status === 'error') return <p className="empty">Recipe did not load. <Link to="/">Back</Link></p>
  if (status === 'missing') return <p className="empty">No recipe with that number. <Link to="/">Back</Link></p>

  const isSaved = favorites.some((f) => f.id === recipe.id)

  return (
    <>
      <h1>{recipe.name}</h1>
      <p>{recipe.ingredients.join(', ')}</p>
      <p className="steps">{recipe.instructions}</p>
      <button className="txt" onClick={() => toggleFavorite(recipe)}>
        {isSaved ? 'Remove from saved' : 'Save'}
      </button>
    </>
  )
}
