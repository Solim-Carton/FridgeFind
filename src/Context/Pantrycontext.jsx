import { createContext, useContext, useState } from 'react'

const PantryContext = createContext(null)

export function PantryProvider({ children }) {

  const [favorites, setFavorites] = useState([])

  
  function toggleFavorite(recipe) {
    setFavorites((current) =>
      current.some((f) => f.id === recipe.id)
        ? current.filter((f) => f.id !== recipe.id)
        : [...current, { id: recipe.id, name: recipe.name }]
    )
  }


  return (
    <PantryContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </PantryContext.Provider>
  )
}

export function usePantry() {
  return useContext(PantryContext)
}