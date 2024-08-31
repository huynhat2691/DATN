// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { RxCross1 } from "react-icons/rx";
// import styles from "../../styles/styles";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import { server } from "../../server";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Payment = () => {
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [orderData, setOrderData] = useState([]);
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     const orderData = JSON.parse(localStorage.getItem("latestOrder"));
//     setOrderData(orderData);
//   }, []);

//   const createOrder = (data, actions) => {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             description: "DATN",
//             amount: {
//               currency_code: "USD",
//               value: orderData?.totalPrice,
//             },
//           },
//         ],
//         application_context: {
//           shipping_preference: "NO_SHIPPING",
//         },
//       })
//       .then((orderId) => {
//         return orderId;
//       });
//   };

//   const onApprove = async (data, actions) => {
//     return actions.order.capture().then(function (details) {
//       const { payer } = details;

//       let paymentInfo = payer;

//       if (paymentInfo !== undefined) {
//         paypalPaymentHandler(paymentInfo);
//       }
//     });
//   };

//   const paypalPaymentHandler = async (paymentInfo) => {
//     if (orderData.adminCouponCode) {
//       try {
//         await axios.put(
//           `${server}/couponCodeAdmin/update-coupon-usage/${orderData.adminCouponCode}`
//         );
//       } catch (error) {
//         console.error("Error updating coupon usage:", error);
//       }
//     }

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     order.paymentInfo = {
//       id: paymentInfo.payer_id,
//       status: "succeeded",
//       type: "Paypal",
//     };

//     await axios
//       .post(`${server}/order/create-order`, order, config)
//       // eslint-disable-next-line no-unused-vars
//       .then((res) => {
//         setOpen(false);
//         navigate("/order/success");
//         toast.success("Đơn hàng đã đặt thành công");
//         localStorage.setItem("cartItems", JSON.stringify([]));
//         localStorage.setItem("latestOrder", JSON.stringify([]));
//         window.location.reload();
//       });
//   };

//   const paymentData = {
//     amount: Math.round(orderData?.totalPrice * 100),
//   };

//   const order = {
//     cart: orderData?.cart,
//     shippingAddress: orderData?.shippingAddress,
//     user: user && user,
//     totalPrice: orderData?.totalPrice,
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         `${server}/payment/process`,
//         paymentData,
//         config
//       );

//       const client_secret = data.client_secret;

//       if (!stripe || !elements) return;

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           order.paymentInfo = {
//             id: result.paymentIntent.id,
//             status: result.paymentIntent.status,
//             type: "Credit Card",
//           };
//           await axios
//             .post(`${server}/order/create-order`, order, config)
//             // eslint-disable-next-line no-unused-vars
//             .then((res) => {
//               setOpen(false);
//               navigate("/order/success");
//               toast.success("Đơn hàng đã đặt thành công");
//               localStorage.setItem("cartItems", JSON.stringify([]));
//               localStorage.setItem("latestOrder", JSON.stringify([]));
//               window.location.reload();
//             });
//         }
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   const cashOnDeliveryHandler = async (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     order.paymentInfo = {
//       type: "Thanh toán khi nhận hàng",
//     };

//     await axios
//       .post(`${server}/order/create-order`, order, config)
//       // eslint-disable-next-line no-unused-vars
//       .then((res) => {
//         setOpen(false);
//         navigate("/order/success");
//         toast.success("Đơn hàng đã đặt thành công");
//         localStorage.setItem("cartItems", JSON.stringify([]));
//         localStorage.setItem("latestOrder", JSON.stringify([]));
//         window.location.reload();
//       });
//   };

//   return (
//     <div className="w-full flex flex-col items-center py-8">
//       <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
//         <div className="w-full 800px:w-[65%]">
//           <PaymentInfo
//             user={user}
//             open={open}
//             setOpen={setOpen}
//             onApprove={onApprove}
//             createOrder={createOrder}
//             paymentHandler={paymentHandler}
//             cashOnDeliveryHandler={cashOnDeliveryHandler}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentInfo = ({
//   user,
//   open,
//   setOpen,
//   onApprove,
//   createOrder,
//   paymentHandler,
//   cashOnDeliveryHandler,
// }) => {
//   const [select, setSelect] = useState(1);

//   return (
//     <div className="w-full 800px:w-[95%] bg-[#fff] rounded-lg border p-5">
//       {/* select buttons */}
//       <div>
//         <div className="flex w-full pb-5 border-b mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(1)}
//           >
//             {select === 1 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
//             Thanh toán bằng thẻ ghi nợ/tín dụng
//           </h4>
//         </div>

//         {/* pay with card */}
//         {select === 1 ? (
//           <div className="w-full flex border-b">
//             <form className="w-full" onSubmit={paymentHandler}>
//               <div className="w-full flex pb-3">
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Tên trên thẻ</label>
//                   <input
//                     required
//                     className={`${styles.input} !w-[95%] text-[#444]`}
//                     placeholder={user && user.name}
//                     value={user && user.name}
//                   />
//                 </div>
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Ngày hết hạn</label>
//                   <CardExpiryElement
//                     className={`${styles.input}`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "19px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex pb-3">
//                 <div className="w-[50%]">
//                   <label className="block pb-2">Số thẻ</label>
//                   <CardNumberElement
//                     className={`${styles.input} !h-[35px] !w-[95%]`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "19px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//                 <div className="w-[50%]">
//                   <label className="block pb-2">CVV</label>
//                   <CardCvcElement
//                     className={`${styles.input} !h-[35px]`}
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "19px",
//                           lineHeight: 1.5,
//                           color: "#444",
//                         },
//                         empty: {
//                           color: "#3a120a",
//                           backgroundColor: "transparent",
//                           "::placeholder": {
//                             color: "#444",
//                           },
//                         },
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//               <input
//                 type="submit"
//                 value="Thanh toán ngay"
//                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               />
//             </form>
//           </div>
//         ) : null}
//       </div>

//       <br />
//       {/* paypal payment */}
//       <div>
//         <div className="flex w-full pb-5 border-b mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(2)}
//           >
//             {select === 2 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
//             Thanh toán bằng Paypal
//           </h4>
//         </div>

//         {/* pay with paypal */}
//         {select === 2 ? (
//           <div className="w-full flex border-b">
//             <div
//               className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               onClick={() => setOpen(true)}
//             >
//               Thanh toán ngay
//             </div>
//             {open && (
//               <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
//                 <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-auto">
//                   <div className="w-full flex justify-end p-3">
//                     <RxCross1
//                       size={30}
//                       className="cursor-pointer absolute top-3 right-3"
//                       onClick={() => setOpen(false)}
//                     />
//                   </div>
//                   <PayPalScriptProvider
//                     options={{
//                       "client-id":
//                         "ATdwgvh-fsKR8w9Is5YynZnBhUtRVU2pOBgvtbZsWSnh7JjrWCLNchCMrfhh1tk1_NDWjBaaRDKk3y7R",
//                     }}
//                   >
//                     <PayPalButtons
//                       style={{
//                         layout: "vertical",
//                         color: "blue",
//                         shape: "rect",
//                         label: "buynow",
//                       }}
//                       onApprove={onApprove}
//                       createOrder={createOrder}
//                     />
//                   </PayPalScriptProvider>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : null}
//       </div>

//       <br />
//       {/* cash on delivery */}
//       <div>
//         <div className="flex w-full pb-5 border-b mb-2">
//           <div
//             className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
//             onClick={() => setSelect(3)}
//           >
//             {select === 3 ? (
//               <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
//             ) : null}
//           </div>
//           <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
//             Thanh toán khi nhận hàng
//           </h4>
//         </div>

//         {/* cash on delivery */}
//         {select === 3 ? (
//           <div className="w-full flex">
//             <form className="w-full" onSubmit={cashOnDeliveryHandler}>
//               <input
//                 type="submit"
//                 value="Xác nhận"
//                 className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
//               />
//             </form>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Payment;
