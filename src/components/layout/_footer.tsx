import { CtaWavesBg } from "../icons-svgs/ctaWavesBg"

export const Footer = () => {

  return (
    <footer className="bg-space_cadet w-full">
      {/* <CtaWavesBg className="bg-mauve fill-space_cadet"/> */}
      {/* Newsletter */}
      <section>
        <h2> Join the Newsletter</h2>
        <div>
          <button>
            Subscribe
          </button>
          <input placeholder="youremailhere@site.com" className="bg-white w-fit h-fit">
          </input>
        </div>
      </section>
    </footer>
  )
}