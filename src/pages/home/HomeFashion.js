import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>9Shop | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of 9Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderNine spaceLeftClass="ml-70" spaceRightClass="mr-70" />

        {/* tab product */}
        <TabProduct
          spaceTopClass="pt-60"
          spaceBottomClass="pb-60"
          category="fashion"
        />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />

        {/* featured icon di chuyển xuống dưới trang Home*/}
        <FeatureIcon spaceBottomClass="pb-60" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
