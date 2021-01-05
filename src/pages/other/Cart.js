import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decrementQty,
  removeFromCart,
  cartItemStock,
  removeAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Cart = ({
  location,
  cartItems,
  currency,
  decrementQty,
  addToCart,
  removeFromCart,
  removeAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Giỏ hàng</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                    cartItem.selectedProductSize ? (
                                      <div className="cart-item-variation">
                                        <span>
                                          Color: {cartItem.selectedProductColor}
                                        </span>
                                        <span>
                                          Size: {cartItem.selectedProductSize}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                    )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decrementQty(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                        cartItemStock(
                                          cartItem,
                                          cartItem.selectedProductColor,
                                          cartItem.selectedProductSize
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? currency.currencySymbol +
                                    (
                                      finalDiscountedPrice * cartItem.quantity
                                    ).toFixed(2)
                                    : currency.currencySymbol +
                                    (
                                      finalProductPrice * cartItem.quantity
                                    ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      removeFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Tiếp tục mua sắm
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => removeAllFromCart(addToast)}>
                          Xóa giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Ước tính Vận chuyển và Thuế
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Nhập điểm nhận hàng của bạn để nhận ước tính vận chuyển.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Tỉnh/ Thành phố</label>
                            <select className="email s-email s-wid">
                              <option>Hồ Chí Minh</option>
                              <option>Đà Nẵng</option>
                              <option>Hà Nội</option>
                              <option>Vũng Tàu</option>
                              <option>Đà Lạt</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Quận/ Huyện</label>
                            <select className="email s-email s-wid">
                              <option>Quận 1</option>
                              <option>Quận 3</option>
                              <option>Quận 5</option>
                              <option>Quận Tân Bình</option>
                              <option>Quận Tân Phú</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Phường/ Xã</label>
                            <select className="email s-email s-wid">
                              <option>Phường 1</option>
                              <option>Phường 2</option>
                              <option>Phường 3</option>
                              <option>Phường 4</option>
                              <option>Phường 5</option>
                            </select>
                          </div>
                          {/* <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div> */}
                          <button className="cart-btn-2" type="submit">
                            Nhận báo giá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Sử dụng mã phiếu giảm giá
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Nhập mã phiếu giảm giá của bạn nếu có.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Áp dụng phiếu giảm giá
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng tiền
                        </h4>
                      </div>
                      <h5>
                        Tạm tính{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng cộng{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Tiến hành đặt hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cart"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No items found in cart <br />{" "}
                        <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                          Shop Now
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  location: PropTypes.object,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decrementQty: (item, addToast) => {
      dispatch(decrementQty(item, addToast));
    },
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
    removeAllFromCart: addToast => {
      dispatch(removeAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
