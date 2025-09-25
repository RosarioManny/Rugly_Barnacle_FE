import { useState } from "react";
import { Header } from "../../components/layout/_header";
import { ShopBtn } from "../../components/ui/buttons/index";
import { CtaWavesBg } from "../../components/ui/icons-svgs/ctaWavesBg";
import { createCustomOrder } from "../../lib/api/CustomOrder/customOrderServices"; 
import type { CustomOrderData } from "../../lib/api/CustomOrder/customOrderServices";

export const CustomOrder = () => {
  const [formData, setFormData] = useState({
    customer_name: "", 
    email: "",
    description: "", 
    deadline: "",
    budget: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{success: boolean; referenceId?: string; message?: string} | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(name, value)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for API (only fields that match your Django model)
      const apiData: CustomOrderData = {
        customer_name: formData.customer_name,
        email: formData.email,
        description: `${formData.description}
          --------------------------
          Additional Details:
          Deadline: ${formData?.deadline ? formData.deadline : "Normal - 1-2 weeks"}
          Size & Budget: ${formData?.budget ? formData.budget : "2ft - $200+"}
          `
      };

      console.log("The Data ::", apiData)
      const result = await createCustomOrder(apiData);
      
      setSubmissionResult({
        success: true,
        referenceId: result.reference_id,
        message: "Custom order submitted successfully! We'll contact you soon."
      });

      // Reset form on success
      setFormData({
        customer_name: "",
        email: "",
        description: "",
        deadline: "",
        budget: ""
      });

    } catch (error: any) {
      console.error("Submission failed:", error);
      setSubmissionResult({
        success: false,
        message: error.response?.data?.error || "Failed to submit order. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main aria-label="Custom Order Form" className=" flex flex-col items-center ">
      <Header
        title="Custom Order"
        tagline="Bring your vision to life with a custom rug!"
        img="/gallery/Product_Wristrug_Assorted_Showcase copy.webp"
        img_alt="Owner looking at a floor filled with rugs"
      />
      
      {/* Success/Error Message */}
      {submissionResult && (
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
          submissionResult.success ? "bg-robin_egg text-space_cadet" : "bg-bittersweet text-white"
        }`}>
          <div className="font-semibold">
            {submissionResult.success ? "✓ Success!" : "Error"}
          </div>
          <div className="text-sm mt-1">
            {submissionResult.message}
            {submissionResult.referenceId && (
              <div className="mt-2 font-mono bg-black/20 p-2 rounded">
                Reference: {submissionResult.referenceId}
              </div>
            )}
          </div>
        </div>
      )}
      
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
      <section className="flex flex-col items-center justify-center text-center gap-6 mb-10">
        <p className="body_text max-w-3/4">
          Ready to bring your unique vision to life? Fill out the form below with details about your custom rug idea. 
          I'll review your request and get back to you with a quote and timeline!
        </p>
      </section>
      
      {/* FORM */}
      <section className="max-w-4/5 md:max-w-2/3 w-full p-6 bg-white rounded-lg shadow-xl mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-space_cadet mb-1">
                Your Name <span className="text-bittersweet"> * </span>
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
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
                autoComplete="off"
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
            <label htmlFor="description" className="block text-sm font-medium text-space_cadet mb-1">
              Design Description <span className="text-bittersweet"> * </span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your design in detail. Include characters, symbols, colors, and any specific elements you want included."
              className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-space_cadet mb-1">
                Desired Completion
              </label>
              <div className="min-w-[200px]">
                <select
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({...prev, deadline: e.target.value }) ) }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  aria-label="Desired completion "
                >
                  <option id="Deadline - Fast option" value="Fast - 1 week">ASAP - 1 week</option>
                  <option id="Deadline - Normal option" value="Normal - 1-2 weeks">Normal time - 1 - 2 weeks</option>
                  <option id="Deadline - Slow option" value="Slow - 2-3 weeks">No rush - 2 - 3 weeks</option>           
                </select>
              </div>
              <p className="text-xs text-bittersweet/70">Time spent shipping not included <br/> If unspecified, completion within 1-2 weeks.</p>
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-space_cadet mb-1">
                Size & Budget Range <span className="text-bittersweet"> * </span>
              </label>
              <div className="min-w-[200px]">
                <select
                  id="budget"
                  required
                  value={formData?.budget}
                  onChange={(e) => setFormData(prev => ({...prev, budget: e.target.value }) ) }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-majorelle focus:border-transparent"
                  aria-label="Rug Desired size + price range "
                >
                  <option id="2ft - $200+" value="2ft - $200+">2ft - $200+</option>
                  <option id="3ft - $300+" value="3ft - $300+">3ft - $300+</option>
                  <option id="4ft - $400+" value="4ft - $400+">4ft - $400+</option>
                  <option id="5ft - $500+" value="5ft - $500+">5ft - $500+</option>
                  <option id="6ft - $600+" value="6ft - $600+">6ft - $600+</option>                
                </select>
              </div>
              <p className="text-xs text-bittersweet/70">Prices vary within the specified price range.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                btn_general 
                max-w-[130px] h-[55px]
                flex items-center gap-2 group
                drop-shadow-sm/50 duration-600 
                hover:bg-robin_egg hover:scale-105 
                active:bg-robin_egg active:scale-105 
                focus:bg-robin_egg focus:scale-105
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
          <p className="text-xs text-space_cadet/50"> <span className="text-bittersweet"> * </span> = Required</p>
        </form>
      </section>
      
      {/* Rest of your component remains the same */}
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