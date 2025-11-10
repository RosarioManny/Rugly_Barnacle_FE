import { useState } from "react";
import { getCustomOrder, type CustomOrderResponse } from "../../../lib/api/CustomOrder/customOrderServices";

export const CheckCustomOrderStatus = () => {
  const [referenceId, setReferenceId] = useState("");
  const [orderData, setOrderData] = useState<CustomOrderResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setOrderData(null);

    try {
      const result = await getCustomOrder(referenceId);
      setOrderData(result);
    } catch (err: any) {
      console.error("Error fetching order:", err);
      setError(err.response?.data?.error || "Order not found. Please check your reference ID.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setReferenceId("");
    setOrderData(null);
    setError(null);
  };

  return (
    <section className="max-w-4/5 md:max-w-2/3 w-full p-6 bg-white rounded-lg shadow-xl mb-12">
      {!orderData ? (
        // Lookup Form
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="referenceId" className="block text-sm font-medium text-space_cadet mb-1">
              Order Reference ID <span className="text-bittersweet"> * </span>
            </label>
            <input
              type="text"
              id="referenceId"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              required
              placeholder="Enter your order reference ID"
              className="w-full px-4 py-2 border border-space_cadet/30 rounded-md focus:outline-none focus:ring-2 focus:ring-majorelle"
            />
            <p className="text-xs text-space_cadet/50 mt-1">
              You should have received this ID when you submitted your order
            </p>
          </div>

          {error && (
            <div className="p-3 bg-bittersweet/10 border border-bittersweet rounded-md">
              <p className="text-bittersweet text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
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
              {isSubmitting ? "Checking..." : "Check Status"}
            </button>
          </div>
        </form>
      ) : (
        // Order Status Display
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-space_cadet">Order Status</h2>
            <button
              onClick={resetForm}
              className="text-sm text-majorelle hover:underline"
            >
              Check Another Order
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Reference ID</h3>
              <p className="text-space_cadet font-mono bg-fleece/80 p-2 rounded">{orderData.reference_id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Status</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                orderData.status === 'completed' ? 'bg-midnight_green/15 text-midnight_green' :
                orderData.status === 'in_progress' ? 'bg-breeze/50 text-robin_egg' :
                orderData.status === 'pending' ? 'bg-space_cadet/10 text-space_cadet' :
                orderData.status === 'canceled' ? 'bg-bittersweet/20 text-bittersweet' :
                'bg-gray-100 text-gray-800'
              }`}>
                {orderData.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Customer Name</h3>
              <p className="text-space_cadet">{orderData.customer_name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Email</h3>
              <p className="text-space_cadet">{orderData.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Order Description</h3>
            <p className="text-space_cadet bg-fleece/80 p-3 rounded whitespace-pre-wrap">{orderData.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Order Created</h3>
            <p className="text-space_cadet">
              {new Date(orderData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {!orderData.admin_notes && (
            <div>
              <h3 className="text-sm font-medium text-space_cadet/70 mb-1">Tufter Alerts:</h3>
              <p className="text-space_cadet bg-breeze/20 p-3 rounded whitespace-pre-wrap">{orderData.admin_notes}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};