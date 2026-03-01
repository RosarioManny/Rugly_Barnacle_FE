import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { subscribeToNewsletter } from "../../lib/api/Newsletter/newsletter";


interface NewsletterFormProps {
  onSuccess?: () => void;
}
export const NewsLetterForm = ({onSuccess}: NewsletterFormProps) => {
  const [inputData, setInputData ] = useState({ email: "" });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      setAlert(null);
    }, 3000);
    return () => clearTimeout(timer);  // clears if alert changes before timer finishes
  }, [alert]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = { ...inputData, [e.target.name]: e.target.value}
    setInputData(newData)
    // console.log("Input data >>", inputData)
    // console.log("New data >>", newData)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    try {
      const newEmailData = inputData.email.trim();
      await subscribeToNewsletter(newEmailData)
      // console.log("subscribed:", inputData.email) 
      setInputData({email: ""});
      setAlert({ message: "You're subscribed! 🎉", type: 'success' });
      setTimeout(() => {
        onSuccess?.();  
      }, 1500);
    } catch (err: any) {
      console.error("Error subscribing to newsletter:", err);
      setAlert({ message: "Something went wrong. Please try again.", type: 'error' });
    }
  };
  
  return (
    <>
      {alert && (
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 transform-opacity duration-500 ${
          alert.type === 'success' ? 'bg-breeze text-space_cadet' : 'bg-bittersweet text-white'
        }`}>
          <div className="font-semibold">
            {alert.type === 'success' ? '✓ Subscribed!' : 'Error'}
          </div>
          <div className="text-sm mt-1">
            {alert.message}
          </div>
        </div>
      )}
      <form className="flex flex-shrink justify-center my-4" onSubmit={handleSubmit}>
        <button 
          className="
          bg-breeze text-space_cadet font-bold 
          rounded-l-xl 
          flex items-center justify-center
          max-h-[40px]
          hover:bg-robin_egg 
          "
          type="submit"> 
          <p>
            Subscribe 
          </p>
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
          className="bg-white md:w-xs w-2/3 max-h-[40px] max-w-[250px] rounded-r-xl pl-2 py-2">
        </input>
      </form>
      
    </>
  )
}


// python manage.py migrate && python manage.py collectstatic --noinput && gunicorn rbproduct.wsgi