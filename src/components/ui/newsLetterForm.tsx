import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
// ChangeEvent and FormEvent are effective TS types for the event.targets. 
// Allowing TS to know what will be happening to an element. 
// See handleChange for more.

export const NewsLetterForm = () => {
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    console.log("subscribed:", inputData.email) 
    setInputData({email: ""});
  };
  
  return (
    <section className="my-4">
        <h1 className="
        heading_text 
        my-3
        text-20 text-mauve 
        underline underline-offset-6 decoration-2 decoration-wavy"> Join the Newsletter</h1>
        <form className="" onSubmit={handleSubmit}>
          <button 
            className="
            bg-breeze text-space_cadet font-bold rounded-l-2xl p-2
            hover:bg-robin_egg hover:text-fleece hover:scale-105 
            "
            type="submit"> 
            Subscribe 
          </button>
          <input 
            onChange={handleChange}
            id="newletter-subsciption" 
            value={inputData.email}
            name="email"
            type="email"
            aria-describedby="email-error"
            placeholder="youremail@site.com" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="bg-white md:w-xs w-2/3 max-h-[40px] rounded-r-2xl pl-2 py-2">
          </input>
        </form>
      </section>
  )
}