import React from 'react';

const Orders = () => {
  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-medium mb-2">Order History</h2>
        <div className="text-gray-600">
          <p>Order #12345</p>
          <p>Status: Shipped</p>
          {/* Add more order details here */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
