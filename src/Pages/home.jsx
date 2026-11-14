import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  
  const [text, setText] = useState('')
  const navigate = useNavigate() 

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    
    navigate(`/results?ingredients=${encodeURIComponent(text)}`)
  }

  return (
    <form className="say" onSubmit={handleSubmit}>
      <label htmlFor="ingredients">I have</label>
      <input
        id="ingredients"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="chicken, rice"
        autoComplete="off"
      />
      <button className="txt" type="submit">find</button>
    </form>
  )
}