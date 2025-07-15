import { CtaWavesBg } from "../icons-svgs/ctaWavesBg"
import { useState, ChangeEvent, FormEvent } from "react"
// ChangeEvent and FormEvent are effective TS types for the event.targets. 
// Allowing TS to know what will be happening to an element. 
// See handleChange for more.

export const Footer = () => {
  const [inputData, setInputData ] = useState(
    { email: "" }
  );

  // Generic <HTMLInputElement> ensures TypeScript knows e.target is an input. 
  // ChangeEvent flags it saying that it will be changing. 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = { ...inputData, [e.target.name]: e.target.value}
    setInputData(newData)
    console.log("Input data >>", inputData)
    console.log("New data >>", newData)
  };

  // FormEvent tells TS that this the base form submission even. It's like a "submit" type.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();  
    console.log("subscribed:", inputData.email) 
    setInputData({email: ""});
  };
  
  return (
    <footer className="bg-space_cadet w-full">
      {/* <CtaWavesBg className="bg-mauve fill-space_cadet"/> */}
      {/* Newsletter */}
      <section>
        <h2> Join the Newsletter</h2>
        <form onSubmit={handleSubmit}>
          <button 
            type="submit"> 
            Subscribe 
          </button>
          <input 
            onChange={handleChange}
            id="newletter-subsciption" 
            value={inputData.email}
            name="email"
            type="email"
            placeholder="youremailhere@site.com" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="bg-white w-fit h-fit">
          </input>
        </form>
      </section>
    </footer>
  )
}