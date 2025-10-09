import { useState } from "react";
import { Header } from "../../components/layout/_header";
// import { ShopBtn } from "../../components/ui/buttons/index";
import { CreateCustomOrderForm } from "../../components/ui/customForm/createCustomForm";
import { CheckCustomOrderStatus } from "../../components/ui/customForm/checkCustomOrderStatus.tsx";
// import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg";

export const CustomOrder = () => {
  const [activeView, setActiveView] = useState<"create" | "status">("create");

  return (
    <main aria-label="Custom Order Form" className=" flex flex-col items-center ">
      <Header
        title="Custom Order"
        tagline="Bring your vision to life with a custom rug!"
        img="/gallery/Product_Wristrug_Assorted_Showcase copy.webp"
        img_alt="Owner looking at a floor filled with rugs"
      />
      
      {/* TITLE */}
      <section className="flex m-2 flex-col items-center text-center"> 
        <img 
          className="flex justify-start h-14 w-14" 
          src="/assets/design/icons/X_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
        <h1 className="heading_text">
          {activeView === "create" ? "Create Custom Rug" : "Check Order Status"}
        </h1>
      </section>
      
      {/* VIEW TOGGLE BUTTONS */}
      <section className="flex gap-4 mx-2 mb-6">
        <button
          onClick={() => setActiveView("create")}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeView === "create" 
              ? "bg-majorelle text-white" 
              : "bg-gray-100 text-space_cadet hover:bg-gray-200"
          }`}
        >
          Create Custom Order
        </button>
        <button
          onClick={() => setActiveView("status")}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeView === "status" 
              ? "bg-majorelle text-white" 
              : "bg-gray-100 text-space_cadet hover:bg-gray-200"
          }`}
        >
          Check Order Status
        </button>
      </section>
      
      {/* CONTENT */}
      <section className="flex flex-col items-center justify-center text-center gap-6 mb-10">
        <p className="body_text md:w-[50%] w-[75%] ">
          {activeView === "create" 
            ? "Ready to bring your unique vision to life? Fill out the form below with details about your custom rug idea. I'll review your request and get back to you with a quote and timeline!"
            : "Enter your order reference ID to check the current status of your custom rug order."
          }
        </p>
      </section>
      
      {/* DYNAMIC CONTENT */}
      {activeView === "create" ? (
        <CreateCustomOrderForm />
      ) : (
        <CheckCustomOrderStatus />
      )}
      
      {/* <CtaWavesBg className="fill-mauve w-[100vw]" />
      <section className="bg-mauve w-full pb-14 md:pb-24 flex font-medium flex-col items-center text-center ">
        <p className="m-2 font-semibold subheading_text">
          Not ready for a custom order? <br/> Check out my premade rugs!
        </p>
        <div className="flex flex-col gap-8 my-8 items-center ">
          <ShopBtn/>
          <img 
            className="flex justify-start mx-4 h-10 w-10" 
            src="/assets/design/icons/Cross_Star_White.webp" 
            aria-hidden="true" 
            alt="Cross Star Design Marker" 
          />
        </div>
      </section> */}
    </main>
  );
};