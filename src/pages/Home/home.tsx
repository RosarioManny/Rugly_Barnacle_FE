import { useState } from "react"

export const Home = () => {
  const [statement, setStatement] = useState(false)

  const handleChange = () => {
    setStatement(!statement)
  }
  return (
    <>
      <h1>
        I am the home page
        <button
        onClick={handleChange}>
          What do you like?
        </button>
        {statement ? (
            <p>
              I like Cats
            </p>
          ) 
            :
          (
            <p>
              Actually I like dogs
            </p>
        )}
      </h1>
    </>
  )
}
