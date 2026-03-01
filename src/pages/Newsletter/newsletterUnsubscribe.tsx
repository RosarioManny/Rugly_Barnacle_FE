import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { unsubscribeFromNewsletter } from "../../lib/api/Newsletter/newsletter";
import { ShopBtn } from "../../components/ui/buttons";
import { Shop } from "../Shop/shop";


export const NewsletterUnsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    try {
      await unsubscribeFromNewsletter(email.trim());
      setIsSubmitted(true);
      setAlert({ message: "You've been unsubscribed successfully.", type: 'success' });
    } catch (err: any) {
      setAlert({ message: "Something went wrong. Please try again.", type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-fleece flex items-center pb-30">

      {/* Alert */}
      {alert && (
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 transition-opacity duration-500 ${
          alert.type === 'success' ? 'bg-breeze text-space_cadet' : 'bg-bittersweet text-white'
        }`}>
          <div className="font-semibold">
            {alert.type === 'success' ? '✓ Unsubscribed!' : 'Error'}
          </div>
          <div className="text-sm mt-1">{alert.message}</div>
        </div>
      )}

      <div className="relative w-full flex items-center flex-col">

        {/* Banner */}
        <img
          className="object-cover h-48 mb-6"
          src="/assets/design/logo/RuglyBarnacle_Logo.webp"
          alt="Rugly Barnacle Banner"
        />

        {/* Content */}
        <div className="bg-white rounded-lg px-6 mx-4 py-8 outline-1 outline-mauve  flex flex-col items-center text-center">
          {isSubmitted ? (
            <div className="py-4">
              <h1 className="text-2xl font-bold text-mauve mb-3">You're Unsubscribed</h1>
              <p className="text-space_cadet">
                We're sorry to see you go! You won't receive any more emails from us.
              </p>
              <div className="flex mt-8 gap-6 items-center justify-center">
                <button className="
                      bg-space_cadet
                      w-auto h-[55px]
                      flex items-center gap-2 group
                      drop-shadow-sm/50 duration-600 rounded-lg
                      hover:bg-robin_egg hover:scale-105 hover:text-space_cadet
                      active:bg-robin_egg active:scale-105 
                      focus:bg-robin_egg focus:scale-105">
                  <Link to="/">
                    Back to Home
                  </Link>
                </button>
                <ShopBtn />
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-3">
                <img
                  className="size-12"
                  src="/assets/design/icons/Cross_Star_Pink.webp"
                  aria-hidden="true"
                  alt="Teal Star decorator"
                />
                <h1 className="text-3xl font-bold underline text-space_cadet mb-2 pt-2">
                  Unsubscribe
                </h1>
              </div>
              <p className="text-space_cadet text-sm mb-4">
                Enter your email below to unsubscribe from the newsletter.
              </p>
              <form className="flex flex-col items-center gap-3 w-full" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="youremail@site.com"
                  required
                  className="w-full max-w-sm py-2 px-4 rounded-xl bg-fleece text-space_cadet focus:outline-none focus:ring-2 focus:ring-majorelle/30 transition-colors"
                />
                <div className="flex gap-3">
                  {isConfirming && (
                    <button
                      type="button"
                      onClick={() => setIsConfirming(false)}
                      className="bg-fleece text-space_cadet font-bold px-6 py-2 rounded-xl hover:bg-breez/50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-bittersweet text-white font-bold px-6 py-2 rounded-xl hover:opacity-90 transition-opacity duration-300"
                  >
                    Unsubscribe
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        {/* Warning — shows after first click */}
        {isConfirming && (
          <div className="bg-white border border-bittersweet text-space_cadet text-sm rounded-xl m-4 px-4 py-3 max-w-md text-left">
            <p className="font-bold mb-1">Are you sure?</p>
            <p>
              Unsubscribing will take you out of the loop with Rugly Barnacle. You'll miss out on
              upcoming events, blog posts about tufting and rugs, and future products.
            </p>
            <p className="mt-2 font-semibold">Click Unsubscribe again to confirm.</p>
          </div>
        )}
      </div>
    </div>
  );
};