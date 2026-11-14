const KEY = import.meta.env.VITE_MEALDB_KEY 
const BASE = `https://www.themealdb.com/api/json/v1/${KEY}`


export async function searchByIngredients(ingredients) {
  const counts = new Map() 

  const responses = await Promise.all(
    ingredients.map(async (ingredient) => {
      const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`)
      if (!res.ok) throw new Error('Request failed')
      
      return res.json().catch(() => ({ meals: null }))
    })
  )

  responses.forEach((data) => {
    
    ;(data.meals || []).forEach((meal) => {
      const found = counts.get(meal.idMeal)
      counts.set(meal.idMeal, {
        id: meal.idMeal,
        name: meal.strMeal,
        matched: (found ? found.matched : 0) + 1,
      })
    })
  })

  
  return [...counts.values()].sort((a, b) => b.matched - a.matched)
}


export async function getRecipe(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error('Request failed')
  const data = await res.json()
  const meal = data.meals && data.meals[0]
  if (!meal) return null 

 
  const ingredients = []
  for (let n = 1; n <= 20; n++) {
    const name = meal[`strIngredient${n}`]
    if (name && name.trim()) {
      ingredients.push(`${(meal[`strMeasure${n}`] || '').trim()} ${name.trim()}`.trim())
    }
  }

  return { id: meal.idMeal, name: meal.strMeal, instructions: meal.strInstructions, ingredients }
}
