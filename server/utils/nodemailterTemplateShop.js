const shopActivationEmailTemplate = (shopName, activationUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Shop Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #27b3e2;
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            background-color: #27b3e2;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .button-active {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Kích hoạt tài khoản bán hàng</h1>
            <img src="./assets/logo3.png" width="200px" alt="">
        </div>
        <div class="content">
            <h2>Xin chào ${shopName},</h2>
            <p>Cảm ơn bạn đã đăng ký bán hàng trên eCommUnity. Để kích hoạt tài khoản bán hàng của bạn, vui lòng nhấp vào nút bên dưới:</p>
            <p class="button-active">
                <a href="${activationUrl}" class="button">Kích hoạt tài khoản</a>
            </p>
            <p>Nếu nút này không hoạt động, bạn cũng có thể sao chép và dán liên kết sau vào trình duyệt của mình:</p>
            <p>${activationUrl}</p>
            <p>Nếu không phải bạn, vui lòng bỏ qua email này.</p>
            <p>Trân trọng,<br>ECOMMUNITY Team</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = shopActivationEmailTemplate;