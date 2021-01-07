import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import authorizationActions from "../../redux/actions/authorizationActions";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  removeFromCart,
  iconWhiteClass
}) => {
  const dispatch = useDispatch();
  const authorizationData = useSelector((state) => state.authorizationData);
  const { username, isAuthenticated } = authorizationData;
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const logout = () => {
    dispatch(authorizationActions.setIsLoadingAction());
    dispatch(authorizationActions.setIsAuthenticatedAction(false));
    dispatch(authorizationActions.setUserAction(""));
  }

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      {!isAuthenticated && <div className="same-style account-setting d-none d-lg-block">
        <Link to={process.env.PUBLIC_URL + "/login-register"} style={{ fontSize: 15 }}>Login</Link>
      </div>}
      {isAuthenticated && <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
              <li>Hi, {username}</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  My Account
                </Link>
              </li>
              <li onClick={logout}>
                <Link>
                  Log out
                </Link>
              </li>
          </ul>
        </div>
      </div> }
      {isAuthenticated && <Fragment>
        <div className="same-style header-compare">
          <Link to={process.env.PUBLIC_URL + "/compare"}>
            <i className="pe-7s-shuffle" />
            <span className="count-style">
              {compareData && compareData.length ? compareData.length : 0}
            </span>
          </Link>
        </div>
        <div className="same-style header-wishlist">
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>
            <i className="pe-7s-like" />
            <span className="count-style">
              {wishlistData && wishlistData.length ? wishlistData.length : 0}
            </span>
          </Link>
        </div>
        <div className="same-style cart-wrap d-none d-lg-block">
          <button className="icon-cart" onClick={e => handleClick(e)}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span>
          </button>
          {/* menu cart */}
          <MenuCart
            cartData={cartData}
            currency={currency}
            removeFromCart={removeFromCart}
          />
        </div>
        <div className="same-style cart-wrap d-block d-lg-none">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span>
          </Link>
        </div>
        <div className="same-style mobile-off-canvas d-block d-lg-none">
          <button
            className="mobile-aside-button"
            onClick={() => triggerMobileMenu()}
          >
            <i className="pe-7s-menu" />
          </button>
        </div>
      </Fragment>}
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
