import { FiClock, FiCalendar, FiX, FiMapPin } from "react-icons/fi";

const Modal = ({ selectedOrder, onClose }) => {
  return (
    <>
      {selectedOrder && (
        <div className="fixed inset-0 z-200000 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 space-y-6 shadow-2xl border border-gray-100 relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  {selectedOrder._id}
                </h3>

                <span className="inline-block text-[10px] font-bold mt-1 px-2.5 py-0.5 rounded-md text-gray-600 bg-gray-100">
                  {selectedOrder.status}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="space-y-3 bg-[#f8f8f8] p-4 rounded-2xl text-xs">
              <div className="flex items-start gap-2.5 text-gray-700">
                <FiMapPin className="text-red-500 text-sm mt-0.5 shrink-0" />

                <span className="font-medium">
                  {selectedOrder.deliveryAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-gray-500 pt-1 border-t border-gray-200/60">
                <FiCalendar className="text-xs" />

                <span>
                  {new Date(selectedOrder.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Africa/Cairo",
                    },
                  )}
                </span>

                <span>•</span>

                <FiClock className="text-xs" />

                <span>
                  {new Date(selectedOrder.createdAt).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Africa/Cairo",
                    },
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Order Summary
              </h4>

              <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between text-xs font-bold text-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center text-[10px]">
                        {item.quantity}x
                      </span>

                      <span>{item.menuItem?.name}</span>
                    </div>

                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>

                <span>
                  $
                  {(
                    selectedOrder.totalAmount -
                    selectedOrder.shippingFee +
                    selectedOrder.discountAmount
                  ).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-500 font-medium">
                <span>Delivery Fee</span>

                <span>${selectedOrder.shippingFee.toFixed(2)}</span>
              </div>

              {selectedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>

                  <span>-${selectedOrder.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-900 font-extrabold text-sm pt-2 border-t border-gray-100">
                <span>Total</span>

                <span className="text-red-500">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-3 rounded-full shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
