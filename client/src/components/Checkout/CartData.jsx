/* eslint-disable react/prop-types */
import { NumericFormat } from "react-number-format";

const CartData = ({
  finalTotalPrice,
  shipping,
  subTotalPrice,
  totalDiscountPrice,
}) => {
  return (
    <div className="w-full bg-white rounded-lg border p-5">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">
            Tổng tiền hàng:
          </h3>
          <h5 className="text-[16px] font-[600]">
            <NumericFormat
              value={subTotalPrice}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={0}
              renderText={(value) => (
                <span>
                  {value}
                  <sup>₫</sup>
                </span>
              )}
            />
          </h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">
            Phí vận chuyển:
          </h3>
          <h5 className="text-[16px] font-[600]">
            <NumericFormat
              value={shipping}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={0}
              renderText={(value) => (
                <span>
                  {value}
                  <sup>₫</sup>
                </span>
              )}
            />
          </h5>
        </div>
        {totalDiscountPrice > 0 && (
          <>
            <br />
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                Tổng cộng mã giảm giá:
              </h3>
              <h5 className="text-[16px] font-[600]">
                -
                <NumericFormat
                  value={totalDiscountPrice}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={0}
                  renderText={(value) => (
                    <span>
                      {value}
                      <sup>₫</sup>
                    </span>
                  )}
                />
              </h5>
            </div>
          </>
        )}
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">
            Thành tiền:
          </h3>
          <h5 className="text-[16px] font-[600] text-end">
            <NumericFormat
              value={finalTotalPrice}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={0}
              renderText={(value) => (
                <span>
                  {value}
                  <sup>₫</sup>
                </span>
              )}
            />
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CartData;
