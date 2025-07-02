// import React, { useState, useEffect } from 'react';

// const ProductReviewChat = ({ productId }) => {
//   const [message, setMessage] = useState('');
//   const [image, setImage] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const fetchReviews = async () => {
//     const res = await fetch(`http://localhost:5000/api/reviews/${productId}`);
//     const data = await res.json();
//     if (data.success) setReviews(data.data);
//   };

//   useEffect(() => fetchReviews(), [productId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('message', message);
//     if (image) form.append('image', image);

//     const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
//       method: 'POST',
//       body: form,
//       credentials: 'include'
//     });
//     const data = await res.json();
//     if (data.success) {
//       setMessage('');
//       setImage(null);
//       fetchReviews();
//     }
//   };

//   return (
//     <div className="mt-8 bg-white shadow p-4 rounded-md">
//       <h2 className="text-xl font-bold mb-4">💬 Reviews</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <textarea
//           className="border p-2 rounded"
//           placeholder="Write your review..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//         />
//         <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </form>

//       <div className="mt-6 max-h-80 overflow-y-auto space-y-4">
//         {reviews.map((r) => (
//           <div key={r._id} className="bg-gray-50 p-3 rounded border">
//             <p className="text-sm text-gray-600 font-semibold">{r.userName}</p>
//             <p className="text-gray-800 mb-2">{r.message}</p>
//             {r.image && (
//               <img src={`http://localhost:5000${r.image}`} alt="attachment" className="w-40 h-auto rounded shadow" />
//             )}
//             <div className="text-xs text-gray-500 text-right">
//               {new Date(r.timestamp).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductReviewChat;
