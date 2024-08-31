/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import styles from "../../styles/styles";

// const CheckoutSteps = ({ active }) => {
//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
//         <div className={`${styles.normalFlex}`}>
//           <div className={`${styles.cart_button}`}>
//             <span className={`${styles.cart_button_text}`}>1.Shipping</span>
//           </div>
//           <div
//             className={`${
//               active > 1
//                 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
//                 : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
//             }`}
//           />
//         </div>

//         <div className={`${styles.normalFlex}`}>
//           <div
//             className={`${
//               active > 1
//                 ? `${styles.cart_button}`
//                 : `${styles.cart_button} !bg-[#FDE1E6]`
//             }`}
//           >
//             <span
//               className={`${
//                 active > 1
//                   ? `${styles.cart_button_text}`
//                   : `${styles.cart_button_text} !text-[#f63b60]`
//               }`}
//             >
//               2.Payment
//             </span>
//           </div>
//         </div>

//         <div className={`${styles.normalFlex}`}>
//           <div
//             className={`${
//               active > 3
//                 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
//                 : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
//             }`}
//           />
//           <div
//             className={`${
//               active > 2
//                 ? `${styles.cart_button}`
//                 : `${styles.cart_button} !bg-[#FDE1E6]`
//             }`}
//           >
//             <span
//               className={`${
//                 active > 2
//                   ? `${styles.cart_button_text}`
//                   : `${styles.cart_button_text} !text-[#f63b60]`
//               }`}
//             >
//               3.Success
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSteps;

// import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "90%",
//     margin: "0 auto",
//     [theme.breakpoints.up("md")]: {
//       width: "50%",
//     },
//   },
//   stepper: {
//     backgroundColor: "transparent",
//   },
//   step: {
//     "& $completed": {
//       color: "#f63b60",
//     },
//     "& $active": {
//       color: "#f63b60",
//     },
//     "& $disabled": {
//       color: "#FDE1E6",
//     },
//   },
//   alternativeLabel: {
//     color: "#f63b60",
//   },
//   active: {},
//   completed: {},
//   disabled: {},
//   circle: {
//     width: 30,
//     height: 30,
//     borderRadius: "50%",
//     backgroundColor: "#FDE1E6",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#f63b60",
//     border: "2px solid #f63b60",
//   },
//   activeCircle: {
//     backgroundColor: "#f63b60",
//     color: "white",
//   },
//   completedCircle: {
//     backgroundColor: "#f63b60",
//     color: "white",
//   },
// }));

// const CustomStepIcon = ({ active, completed, icon, classes }) => {
//   const circleClasses = `${classes.circle} ${
//     active ? classes.activeCircle : ""
//   } ${completed ? classes.completedCircle : ""}`;

//   return <div className={circleClasses}>{icon}</div>;
// };

// const CheckoutSteps = ({ active }) => {
//   const classes = useStyles();
//   const steps = ["Nhập thông tin", "Thanh toán", "Thành công"];

//   return (
//     <div className={classes.root}>
//       <Stepper
//         activeStep={active - 1}
//         alternativeLabel
//         className={classes.stepper}
//       >
//         {steps.map((label) => (
//           <Step key={label} className={classes.step}>
//             <StepLabel
//               StepIconComponent={(props) => (
//                 <CustomStepIcon {...props} classes={classes} />
//               )}
//             >
//               {label}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </div>
//   );
// };

// export default CheckoutSteps;
