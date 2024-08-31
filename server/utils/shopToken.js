const sendShopToken = (seller, statusCode, res) => {
  try {
    const token = seller.getJwtToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      seller,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cant create token",
    });
  }
};

module.exports = sendShopToken;
