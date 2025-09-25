import { useState } from "react";
import { Header } from "../../components/layout/_header";
import { ShopBtn } from "../../components/ui/buttons/index";
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg";

export const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designDescription: "",
    dimensions: "",
    colors: "",
    deadline: "",
    referenceImage: null as File | null,
    budget: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, referenceImage: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission (API call, etc.)
    console.log("Form submitted:", formData);
    alert("Thank you for your custom order request! We'll get back to you soon.");
  };

  return (
    <main aria-label="Custom Order Form" className="w-full flex flex-col items-center justify-center">
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
          Request Your Custom Rug
        </h1>
      </section>
      
      {/* CONTENT */}
      <section className="flex  flex-col items-center justify-center text-center gap-6 mb-10">
        <p className="body_text max-w-3/4">
          Ready to bring your unique vision to life? Fill out the form below with details about your custom rug idea. 
          I'll review your request and get back to you with a quote and timeline!
        </p>
      </section>
      
      
      {/* FORM */}
      <section className="max-w-2xl w-auto mx-2 p-6 bg-white rounded-lg shadow-md mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-space_cadet mb-1">
                Your Name <span className="text-bittersweet"> * </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-space_cadet mb-1">
                Email Address <span className="text-bittersweet"> * </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="designDescription" className="block text-sm font-medium text-space_cadet mb-1">
              Design Description <span className="text-bittersweet"> * </span>
            </label>
            <textarea
              id="designDescription"
              name="designDescription"
              value={formData.designDescription}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your design in detail. Include characters, symbols, colors, and any specific elements you want included."
              className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dimensions" className="block text-sm font-medium text-space_cadet mb-1">
                Desired Dimensions 
              </label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                placeholder="(e.g., 2'x3')"
                value={formData.dimensions}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
            
            <div>
              <label htmlFor="colors" className="block text-sm font-medium text-space_cadet mb-1">
                Preferred Colors
              </label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="List main colors you'd like."
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-space_cadet mb-1">
                Desired Completion Date
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-space_cadet mb-1">
                Budget Range
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., $200-300"
                className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="referenceImage" className="block text-sm font-medium text-space_cadet mb-1">
              Reference Image <span className="text-space_cadet/50"> (Optional) </span>
            </label>
            <input
              type="file"
              id="referenceImage"
              name="referenceImage"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
            />
            <p className="text-xs text-space_cadet/50 mt-1">
              Upload reference one image that might help visualize your design. Can be discussed more in email.
            </p>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="
                btn_general 
                max-w-[130px] h-[55px]
                flex items-center gap-2 group
                drop-shadow-sm/50 duration-600 
                hover:bg-robin_egg hover:scale-105 
                active:bg-robin_egg active:scale-105 
                focus:bg-robin_egg focus:scale-105"
            >
              Submit Request
            </button>
          </div>
        </form>
      </section>
      
      {/* CALL-TO-ACTION */}
      <CtaWavesBg className="fill-mauve w-[100vw]" />
      <section className="bg-mauve w-full pb-14 md:pb-24 flex font-medium flex-col items-center text-center ">
        <p className="m-2 font-semibold body_text">
          Not ready for a custom order? Check out my premade rugs!
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
      </section>
    </main>
  );
};