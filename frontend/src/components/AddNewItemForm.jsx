import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { FiLoader, FiPlus, FiImage } from "react-icons/fi";
import * as Yup from "yup";

const AddNewItemForm = () => {
  const initialValues = {
    productName: "",
    category: "Desserts",
    price: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),

    category: Yup.string().required("Category is required"),

    price: Yup.number()
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("Price is required"),

    description: Yup.string(),

    image: Yup.string()
      .url("Please enter a valid image URL")
      .required("Image URL is required"),
  });

  const handleAddProduct = async (
    values,
    { resetForm, setSubmitting }
  ) => {
    try {
      const rawToken = sessionStorage.getItem("accessToken");
      const token = rawToken ? JSON.parse(rawToken) : null;

      const response = await axios.post(
        "http://localhost:5000/api/menu",
        {
          name: values.productName,
          category: values.category,
          price: Number(values.price),
          description: values.description,
          image: values.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data?.message || "Product added successfully!"
      );

      resetForm();
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERROR:", error);

      toast.error(
        error?.response?.data?.message || "Failed to add product"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FiPlus className="text-red-500 text-lg" />

        <h2 className="text-base font-bold text-gray-900">
          Add New Product
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddProduct}
      >
        {({
          errors,
          touched,
          isSubmitting,
          values,
        }) => (
          <Form className="space-y-4">

            {/* Product Name */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                PRODUCT NAME
              </label>

              <Field
                type="text"
                name="productName"
                placeholder="e.g. Chocolate Donut"
                className={`w-full bg-[#fcfcfc] border ${
                  touched.productName && errors.productName
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
              />

              <ErrorMessage
                name="productName"
                component="p"
                className="mt-1 text-[10px] text-red-500"
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-4">

              {/* Category */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  CATEGORY
                </label>

                <Field
                  as="select"
                  name="category"
                  className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors"
                >
                  <option value="Desserts">Desserts</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Bakery">Bakery</option>
                </Field>
              </div>

              {/* Price */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  PRICE ($)
                </label>

                <Field
                  type="text"
                  name="price"
                  placeholder="0.00"
                  className={`w-full bg-[#fcfcfc] border ${
                    touched.price && errors.price
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
                />

                <ErrorMessage
                  name="price"
                  component="p"
                  className="mt-1 text-[10px] text-red-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                DESCRIPTION
              </label>

              <Field
                as="textarea"
                rows="3"
                name="description"
                placeholder="Short product details..."
                className="w-full bg-[#fcfcfc] border border-gray-300 text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors resize-none"
              />

              <ErrorMessage
                name="description"
                component="p"
                className="mt-1 text-[10px] text-red-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                IMAGE URL
              </label>

              <Field
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className={`w-full bg-[#fcfcfc] border ${
                  touched.image && errors.image
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-700 py-2.5 px-3.5 rounded-xl text-xs font-medium focus:outline-none focus:border-gray-500 transition-colors`}
              />

              <ErrorMessage
                name="image"
                component="p"
                className="mt-1 text-[10px] text-red-500"
              />

              {/* Image Preview */}
              {values.image && !errors.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={values.image}
                    alt="Product preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white text-xs font-bold py-3 rounded-full shadow-sm transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin text-sm" />
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewItemForm;