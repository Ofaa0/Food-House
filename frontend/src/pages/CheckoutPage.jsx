import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCheck, FaStar } from 'react-icons/fa';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit' | 'paypal'
  const [submitted, setSubmitted] = useState(false);

  // Formik Hook with Yup Validation Schema
  const formik = useFormik({
    initialValues: {
      cardNumber: '999999999999',
      cardHolder: 'PHAM TRAN LAN CAM NGOC',
      expirationDate: '',
      cvc: '',
      saveCard: true,
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{12,19}$/, 'Enter a valid card number (12-19 digits)')
        .required('Card number is required'),
      cardHolder: Yup.string()
        .min(3, 'Card holder name must be at least 3 characters')
        .required('Card holder name is required'),
      expirationDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in MM/YY format')
        .required('Expiration date is required'),
      cvc: Yup.string()
        .matches(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits')
        .required('CVC is required'),
      saveCard: Yup.boolean(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => setSubmitted(false), 4000);
      }, 1000);
    },
  });

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-100">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Confirm and pay
        </h1>

        {/* Success Alert */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <FaCheck />
            <span>Payment processed successfully! Thank you for your order.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Section */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Pay With Bar */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-gray-900">Pay with</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-main-dark-red text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Paypal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      paymentMethod === 'credit'
                        ? 'bg-main-dark-red text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Credit Card
                  </button>
                </div>
              </div>

              {/* Saved Contact Info Badge */}
              <div className="mt-4">
                <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                  SAVED CONTACT INFO
                </p>
                <button
                  type="button"
                  className="bg-main-dark-red hover:bg-red-700 text-white text-xs font-semibold py-1.5 px-4 rounded-full flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <FaStar className="text-[10px]" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-5 pt-2">
              <h2 className="text-sm font-semibold text-gray-800">Credit Card</h2>

              {/* Card Number */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1.5">
                  CARD NUMBER
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-[#fcfcfc] border ${
                      formik.touched.cardNumber && formik.errors.cardNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } text-gray-700 py-2.5 px-3.5 pr-10 rounded-lg text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                  />
                  {!formik.errors.cardNumber && formik.values.cardNumber && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-700">
                      <FaCheck className="text-xs" />
                    </div>
                  )}
                </div>
                {formik.touched.cardNumber && formik.errors.cardNumber && (
                  <p className="mt-1 text-[11px] text-red-500">{formik.errors.cardNumber}</p>
                )}
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1.5">
                  CARD HOLDER
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formik.values.cardHolder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-[#fcfcfc] border ${
                    formik.touched.cardHolder && formik.errors.cardHolder
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-2.5 px-3.5 rounded-lg text-xs font-semibold focus:outline-none focus:border-gray-500 transition-colors uppercase`}
                />
                {formik.touched.cardHolder && formik.errors.cardHolder && (
                  <p className="mt-1 text-[11px] text-red-500">{formik.errors.cardHolder}</p>
                )}
              </div>

              {/* Expiration Date & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1.5">
                    EXPIRATION DATE
                  </label>
                  <input
                    type="text"
                    name="expirationDate"
                    placeholder="MM / YY"
                    value={formik.values.expirationDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-[#fcfcfc] border ${
                      formik.touched.expirationDate && formik.errors.expirationDate
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } text-gray-700 py-2.5 px-3.5 rounded-lg text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400`}
                  />
                  {formik.touched.expirationDate && formik.errors.expirationDate && (
                    <p className="mt-1 text-[11px] text-red-500">{formik.errors.expirationDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1.5">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    value={formik.values.cvc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-[#fcfcfc] border ${
                      formik.touched.cvc && formik.errors.cvc
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } text-gray-700 py-2.5 px-3.5 rounded-lg text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                  />
                  {formik.touched.cvc && formik.errors.cvc && (
                    <p className="mt-1 text-[11px] text-red-500">{formik.errors.cvc}</p>
                  )}
                </div>
              </div>

              {/* Save Card Checkbox */}
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-800 select-none">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formik.values.saveCard}
                    onChange={formik.handleChange}
                    className="w-4 h-4 rounded text-main-dark-red focus:ring-red-500 border-gray-300 accent-main-dark-red cursor-pointer"
                  />
                  <span>Save Card</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="bg-main-dark-red hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-6 rounded-full shadow-sm hover:shadow transition-all disabled:opacity-50"
                >
                  {formik.isSubmitting ? 'Processing...' : 'Confirm and pay'}
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Price Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-gray-900">Price details</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>$20 x 2</span>
                <span className="font-semibold text-gray-900">$40</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">$0,00</span>
              </div>

              <div className="flex justify-between items-center bg-[#f4f5f7] p-3 rounded-md font-semibold text-gray-900 mt-2">
                <span>Total (USD)</span>
                <span>$68.94</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;