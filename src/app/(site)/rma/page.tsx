"use client";
import "material-symbols";
import { useState } from "react";
import Link from "next/link";

interface RMAItem {
  id: string;
  datePurchased: string;
  sku: string;
  productName: string;
  pricePaid: number;
  serialNumber?: string;
  reasonForReturn: string;
}

const RMAPage = () => {
  const [items, setItems] = useState<RMAItem[]>([]);
  const [formData, setFormData] = useState({
    datePurchased: "",
    sku: "",
    productName: "",
    pricePaid: "",
    serialNumber: "",
    reasonForReturn: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.datePurchased ||
      !formData.sku ||
      !formData.productName ||
      !formData.pricePaid ||
      !formData.reasonForReturn
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newItem: RMAItem = {
      id: Date.now().toString(),
      datePurchased: formData.datePurchased,
      sku: formData.sku,
      productName: formData.productName,
      pricePaid: parseFloat(formData.pricePaid),
      serialNumber: formData.serialNumber || undefined,
      reasonForReturn: formData.reasonForReturn,
    };

    setItems((prev) => [...prev, newItem]);

    // Reset form
    setFormData({
      datePurchased: "",
      sku: "",
      productName: "",
      pricePaid: "",
      serialNumber: "",
      reasonForReturn: "",
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitRMA = () => {
    if (items.length === 0) {
      alert("Please add at least one item to submit RMA");
      return;
    }

    // TODO: Implement RMA submission logic
    console.log("Submitting RMA with items:", items);
    alert(`RMA submitted successfully with ${items.length} item(s)!`);
    
    // Clear items after submission
    setItems([]);
  };

  return (
    <div className="flex-1 lg:ml-0 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <span className="material-symbols-outlined">home</span>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  RMA Request
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Return Merchandise Authorization (RMA)
          </h1>
          <p className="text-gray-600">
            Submit a request to return your purchased items
          </p>
        </div>

        {/* RMA Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Add Item to Return
          </h2>
          <form onSubmit={handleAddItem}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Purchased */}
              <div>
                <label
                  htmlFor="datePurchased"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date Purchased <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="datePurchased"
                  name="datePurchased"
                  value={formData.datePurchased}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SKU */}
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  SKU <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product SKU"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  General Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Paid */}
              <div>
                <label
                  htmlFor="pricePaid"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price Paid <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="pricePaid"
                  name="pricePaid"
                  value={formData.pricePaid}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Serial Number */}
              <div className="md:col-span-2">
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Serial Number <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  placeholder="Enter serial number if applicable"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reason for Return */}
              <div className="md:col-span-2">
                <label
                  htmlFor="reasonForReturn"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reason for Return <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="reasonForReturn"
                  name="reasonForReturn"
                  value={formData.reasonForReturn}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Please describe the reason for returning this item"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>

        {/* Items Table */}
        {items.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Items to Return ({items.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Purchased
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.datePurchased).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.pricePaid.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.serialNumber || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.reasonForReturn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <span className="material-symbols-outlined text-xl">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit RMA Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmitRMA}
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit RMA Request
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
              inventory_2
            </span>
            <p className="text-gray-500 text-lg">
              No items added yet. Use the form above to add items for return.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RMAPage;
