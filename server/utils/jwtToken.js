// create token and saving that in cookies
// const sendToken = (user, statusCode, res) => {
//   const token = user.getJwtToken();

//   // options for cookies
//   const options = {
//     expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   };

//   res
//     .status(statusCode)
//     .cookie("token", token, options)
//     .json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         // Thêm bất kỳ thuộc tính nào khác bạn muốn gửi về phía client
//       },
//       token,
//     });
// };

const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
        success: true,
        // user: { id: user._id, name: user.name, email: user.email },
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cant create token",
    });
  }
};

module.exports = sendToken;
