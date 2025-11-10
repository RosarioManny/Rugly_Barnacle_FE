import { useEffect, useState } from "react";
import type { CustomOrderData } from "../../../lib/api/CustomOrder/customOrderServices";
import { createCustomOrder } from "../../../lib/api/CustomOrder/customOrderServices";
import { DangerIcon } from "../../../components/ui/icons-svgs/SvgIcons";

export const CreateCustomOrderForm = () => {
  const [formData, setFormData] = useState({
    customer_name: "", 
    email: "",
    description: "", 
    budget: "",
    contact_method: "email",
    contact_info: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{success: boolean; referenceId?: string; message?: string} | null>(null);

  useEffect(() => {
    if (submissionResult) {
      const timer = setTimeout(() => {
        setSubmissionResult(null)
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submissionResult])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const removeImage = () => {
    setImage(null);
  };

  const formReset = () => {
    setFormData({
      customer_name: "", 
      email: "",
      description: "", 
      budget: "",
      contact_method: "email",
      contact_info: "",
    });
    removeImage()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanText = (text: string) => text.replace(/\u00A0/g, ' '); 

    try {
      const apiData: CustomOrderData = {
        customer_name: cleanText(formData.customer_name),
        email: cleanText(formData.email),
        description: cleanText(`Description:\n ${formData.description}\n
        Size & Budget: ${formData?.budget ? formData.budget : "2ft - $200+"}`),
        contact_method: cleanText(formData?.contact_method),
        contact_info: cleanText(formData?.contact_info ? formData.contact_info : formData.email),
        image: image || undefined
      };

      const result = await createCustomOrder(apiData);
      
      setSubmissionResult({
        success: true,
        referenceId: result.reference_id,
        message: "Thanks! Email confirmation sent. We'll contact you within 1-2 days."
      });

      formReset()

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
    <>
  {submissionResult && (
    <div className={`fixed top-4 right-4 p-4 rounded-md z-50 transform-opacity duration-500 ${
      submissionResult.success ? "bg-breeze text-space_cadet" : "bg-bittersweet text-white"
    }`}>
      <div className={`font-semibold`}>
        {submissionResult.success ? "✓ Request Submitted!" : "Error"}
      </div>
      <div className="text-sm mt-1">
        {submissionResult.message}
        {submissionResult.referenceId && (
          <div className="mt-2 font-mono bg-robin_egg/50 p-2 rounded">
            Order Reference: {submissionResult.referenceId}
          </div>
        )}
      </div>
    </div>
  )}

  {/* Order Process Overview */}
  <div className="bg-majorelle/10 p-6 w-4/5 text-center rounded-lg mb-8">
    <h2 className="text-xl font-bold text-majorelle mb-4">How Custom Orders Work</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
      <div className="text-center">
        <div className="bg-majorelle text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
        <p className="font-semibold">Submit Request</p>
        <p className="text-xs text-space_cadet/70">Fill out this form with your design ideas</p>
      </div>
      <div className="text-center">
        <div className="bg-majorelle text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
        <p className="font-semibold">Design Consultation</p>
        <p className="text-xs text-space_cadet/70">We'll discuss details and finalize pricing</p>
      </div>
      <div className="text-center">
        <div className="bg-majorelle text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
        <p className="font-semibold">Secure Payment</p>
        <p className="text-xs text-space_cadet/70">Pay via Venmo once design is finalized</p>
      </div>
      <div className="text-center">
        <div className="bg-majorelle text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">4</div>
        <p className="font-semibold">Creation & Delivery</p>
        <p className="text-xs text-space_cadet/70">I create your piece and ship it to you</p>
      </div>
    </div>
  </div>

  <section className="max-w-4/5 md:max-w-2/3 p-6 bg-white rounded-lg shadow-xl mb-12">
    <div className="mb-6 p-4 bg-bittersweet/30 rounded-lg border-l-4 border-bittersweet">
      <p className="text-sm text-space_cadet">
        <strong>Payment Information:</strong> After we finalize your design, a $50 down payment through Zelle or Venmo is required.
        No further payment is needed until your custom design is completed.
      </p>
    </div>

    {/* NEW: Production Timeline Notice */}
    <div className="mb-6 p-4 bg-breeze/30 rounded-lg border-l-4 border-robin_egg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <DangerIcon className="size-8 text-robin_egg rotate-180"/>
        </div>
        <div>
          <h3 className="font-semibold text-space_cadet mb-1">Production Timeline & Reference Images</h3>
          <p className="text-sm text-space_cadet/80">
            • Custom rugs take <strong>2-3 weeks to complete</strong> from design confirmation<br/>
            • Have reference images? Email them once we start collaborating on your design!
          </p>
        </div>
      </div>
    </div>

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

      {/* Contact Preference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact_method" className="block text-sm font-medium text-space_cadet mb-1">
            Preferred Contact Method
          </label>
          <select
            id="contact_method"
            name="contact_method"
            value={formData.contact_method}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-majorelle focus:border-transparent"
          >
            <option value="email">Email</option>
            <option value="instagram">Instagram</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="contact_info" className="block text-sm font-medium text-space_cadet mb-1">
            {formData.contact_method === 'instagram' ? 'Instagram Handle' : 
            formData.contact_method === 'phone' ? 'Phone Number' : 'Contact Info'}
          </label>
          <input
            type="text"
            id="contact_info"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleInputChange}
            placeholder={formData.contact_method === 'instagram' ? '@username' : 
                        formData.contact_method === 'phone' ? 'Phone number' : 'Additional contact info'}
            className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
          />
          <p className="text-xs text-space_cadet/50 mt-1">Leave blank to use your email.</p>
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
          <p className="text-xs text-bittersweet/70">Final pricing confirmed after design consultation</p>
        </div>
        
        {/* Removed the old notice box since we have the new one above */}
        <div></div>
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            bg-majorelle
            w-auto h-[55px]
            drop-shadow-sm
            hover:bg-robin_egg hover:scale-105
            active:bg-robin_egg active:scale-105 
            focus:bg-robin_egg focus:scale-105
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
      <div className="text-center text-sm text-space_cadet/70">
        <p>You'll receive a response within 1-2 business days to discuss your custom order</p>
      </div>
      <p className="text-xs text-space_cadet/50 text-center"> <span className="text-bittersweet"> * </span> = Required</p>
    </form>
  </section>
</>
  )
}