import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import "./hero.css";
import pic1 from "../../../imgs/pic1.png";
import pic2 from "../../../imgs/pic2.png";
import pic3 from "../../../imgs/pic3.png";
import pic4 from "../../../imgs/pic4.png";

import ImageSlider from "../../../components/imageSlider/ImageSlider";

import AuthContext from "../../../context/AuthContext";

const IMAGES = [
  { url: pic1, alt: "Picture One" },
  { url: pic2, alt: "Picture One" },
  { url: pic3, alt: "Picture One" },
  { url: pic4, alt: "Picture One" },
];

const Hero = () => {
  const clientSignIn = useSelector((state) => state.clientSignReducer);

  const { isLoggedIn, getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <div
      className="img-slider-img"
      style={{
        maxWidth: "1200px",
        width: "99.7%",
        aspectRatio: "10 / 6",

        margin: "0 auto",
      }}
    >
      <ImageSlider images={IMAGES} />
    </div>
  );
};

export default Hero;
