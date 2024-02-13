import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import backgroundImage from "../../../Assets/ecommerce.png";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[black] font-[600] capitalize`}
        >
          Lehetőséget adunk <br /> termékeid eladására
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[black]">
          Adj el vagy vásárolj biztonságosan nálunk <br /> Termékeidet
          egyszerűen adhatod el
          <br /> Fedezd fel a kínálatot
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Vásárlás
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
