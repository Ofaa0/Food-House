import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaChevronDown, FaCheckCircle } from 'react-icons/fa';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  // Formik Hook & Validation Schema with Yup
  const formik = useFormik({
    initialValues: {
      topic: '',
      name: '',
      email: '',
      description: '',
    },
    validationSchema: Yup.object({
      topic: Yup.string().required('Please select a topic'),
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      description: Yup.string(),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
        resetForm();
        setTimeout(() => setSubmitted(false), 4000);
      }, 1000);
    },
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Contact us
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              The harder you work for something, the greater you'll feel when you achieve it.
            </p>
          </div>

          {/* Success Alert */}
          {submitted && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              <FaCheckCircle />
              <span>Thank you! Your request has been sent successfully.</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Topic Select Input */}
            <div>
              <div className="relative">
                <select
                  name="topic"
                  value={formik.values.topic}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full appearance-none bg-white border ${
                    formik.touched.topic && formik.errors.topic
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-3 px-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors`}
                >
                  <option value="" disabled hidden>
                    Topic
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="catering">Catering & Events</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 text-xs">
                  <FaChevronDown />
                </div>
              </div>
              {formik.touched.topic && formik.errors.topic && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.topic}</p>
              )}
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-white border ${
                    formik.touched.name && formik.errors.name
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-400`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-white border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } text-gray-700 py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-400`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* Description (Optional) */}
            <div>
              <input
                type="text"
                name="description"
                placeholder="Description (optional)"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-[#4F56F6] hover:bg-[#3d43d8] text-white text-xs font-bold uppercase tracking-wider py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {formik.isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Embedded Google Maps iFrame */}
        <div className="w-full h-[380px] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304603!3d40.697663719178305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;