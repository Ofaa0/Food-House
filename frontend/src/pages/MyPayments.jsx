import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';

const MyPayments = () => {
  const initialValues = {
    cardNumber: '9224 0000 1111 3333',
    cardHolder: 'PHAM TRAN LAN CAM NGOC',
    expirationDate: '',
    cvc: '',
    saveCard: true,
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required('Card number is required'),
    cardHolder: Yup.string().required('Card holder name is required'),
    expirationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be MM/YY')
      .required('Required'),
    cvc: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'Invalid CVC')
      .required('Required'),
    saveCard: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    console.log('Submitted Payment Info:', values);
  };

  return (
    <div className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
      
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
        My payments
      </h1>

      {/* Credit Card Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-1">
            Credit card
          </h2>
          <p className="text-xs font-bold text-gray-900">
            Visa <span className="tracking-widest">••••9999</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Expiration: 02/2024
          </p>
        </div>

        <button
          type="button"
          className="bg-[#4F56F6] hover:bg-[#3d43d8] text-white text-xs font-semibold py-2.5 px-5 rounded-full shadow-sm hover:shadow transition-all"
        >
          Add payment method
        </button>
      </div>

      {/* Add New Credit Card Section Header */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-6">
        <h3 className="text-xs font-bold text-gray-900">
          Add new credit card
        </h3>
        
        {/* Card Logos */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[#1A1F71] italic tracking-tighter">
            VISA
          </span>
          <div className="flex -space-x-1 items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90"></div>
          </div>
        </div>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            
            {/* Card Number */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                CARD NUMBER
              </label>
              <div className="relative flex items-center">
                <Field
                  type="text"
                  name="cardNumber"
                  className={`w-full bg-[#fcfcfc] border ${
                    touched.cardNumber && errors.cardNumber
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-2.5 px-3.5 pr-10 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                />
                {!errors.cardNumber && (
                  <FaCheck className="absolute right-3.5 text-xs text-gray-700 pointer-events-none" />
                )}
              </div>
              <ErrorMessage
                name="cardNumber"
                component="p"
                className="mt-1 text-[10px] text-red-500"
              />
            </div>

            {/* Card Holder */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                CARD HOLDER
              </label>
              <Field
                type="text"
                name="cardHolder"
                className={`w-full bg-[#fcfcfc] border ${
                  touched.cardHolder && errors.cardHolder
                    ? 'border-red-500'
                    : 'border-gray-300'
                } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors uppercase`}
              />
              <ErrorMessage
                name="cardHolder"
                component="p"
                className="mt-1 text-[10px] text-red-500"
              />
            </div>

            {/* Expiration Date & CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  EXPIRATION DATE
                </label>
                <Field
                  type="text"
                  name="expirationDate"
                  placeholder="MM / YY"
                  className={`w-full bg-[#fcfcfc] border ${
                    touched.expirationDate && errors.expirationDate
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400`}
                />
                <ErrorMessage
                  name="expirationDate"
                  component="p"
                  className="mt-1 text-[10px] text-red-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  CVC
                </label>
                <Field
                  type="text"
                  name="cvc"
                  className={`w-full bg-[#fcfcfc] border ${
                    touched.cvc && errors.cvc
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                />
                <ErrorMessage
                  name="cvc"
                  component="p"
                  className="mt-1 text-[10px] text-red-500"
                />
              </div>
            </div>

            {/* Save Card Checkbox */}
            <div className="pt-2 flex items-center">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-900 select-none">
                <Field
                  type="checkbox"
                  name="saveCard"
                  className="w-4 h-4 rounded border-gray-300 accent-[#4F56F6] cursor-pointer"
                />
                <span>Save Card</span>
              </label>
            </div>

          </Form>
        )}
      </Formik>

    </div>
  );
};

export default MyPayments;