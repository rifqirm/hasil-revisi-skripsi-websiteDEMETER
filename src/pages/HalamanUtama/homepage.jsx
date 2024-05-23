import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../styles/global.module.css";
import ProductItem from "../../components/ProdukItem/product_item";
import { FaShippingFast, FaFunnelDollar, FaUserShield } from "react-icons/fa";

import product1 from "../../assets/product/1aglonemaAyunindi.jpg";
import product2 from "../../assets/product/2aglonemaBigroy.jpg";
import product3 from "../../assets/product/3aglonemaKhocin.jpg";
import product4 from "../../assets/product/4aglonemaRedAnjamaniDewasa.jpg";
import product5 from "../../assets/product/5aglonemaRedChocin.jpg";
import product6 from "../../assets/product/6aglonemaRedMajesty.jpg";
import product7 from "../../assets/product/7aglonemaRoDudAnjamani.jpg";
import product8 from "../../assets/product/8aglonemaRotundumAceh.jpg";
import home_banner4 from "../../assets/home_banner4-removebg.png";

const Homepage = () => {
  const navigate = useNavigate();
  const linkRef = useRef(null);

  const handleShopNowClick = (e) => {
    e.preventDefault();
    navigate("/keranjang");
    window.scrollTo(0, 0); // Scroll to the top
  };

  return (
    <>
      <div className={`${Styles.wrapper} ${Styles.banner1}`}></div>
      <div className={Styles.wrapper}>
        <div className={`${Styles.row} ${Styles.grid_product}`}>
          <ProductItem
            image={product1}
            title="Aglonema Ayunindi"
            price="IDR 35.000"
            as={Link}
            to="/cart"
          />
          <ProductItem
            image={product2}
            title="Aglonema Bigroy"
            price="IDR 60.000"
            to="/cart"
          />
          <ProductItem
            image={product3}
            title="Aglonema Khocin"
            price="IDR 60.000"
            to="/cart"
          />
          <ProductItem
            image={product4}
            title="Aglonema Red Anjamani"
            price="IDR 80.000"
            to="/cart"
          />
          <ProductItem
            image={product5}
            title="Aglonema Red Chocin"
            price="IDR 80.000"
            to="/cart"
          />
          <ProductItem
            image={product6}
            title="Aglonema Super White"
            price="IDR 90.000"
            to="/cart"
          />
          <ProductItem
            image={product7}
            title="Aglonema Rodud Anjamani"
            price="IDR 65.000"
            to="/cart"
          />
          <ProductItem
            image={product8}
            title="Aglonema Snow White"
            price="IDR 27.500"
            to="/cart"
          />
        </div>

        <div
          className={`${Styles.row} ${Styles.bg_primary} ${Styles.custom_banner}`}
        >
          <div className={`${Styles.grid2} ${Styles.banner_container}`}>
            <div className={Styles.banner_link}>
              <h1>Menciptakan ruang yang indah dengan "Demeter"</h1>
              <p>
                Membawa keindahan alam ke rumah Anda dan Rasakan keajaiban alam
                dengan Demeter.
              </p>
              <Link ref={linkRef} to="/keranjang" onClick={handleShopNowClick}>
                BELANJA SEKARANG
              </Link>
            </div>
            <div>
              <img
                src={home_banner4}
                className={Styles.image_custom_banner}
                alt="Home Banner 4"
              />
            </div>
          </div>
        </div>

        <div className={`${Styles.row} ${Styles.grid3} ${Styles.features}`}>
          <div>
            <FaShippingFast />
            <h4>Bebas Biaya Kirim</h4>
            <p>
              Nikmati pengiriman gratis untuk pembelian tanaman hias di Demeter.
              Tambahkan keindahan alam ke dalam rumah Anda tanpa biaya
              pengiriman tambahan. Segera berbelanja dan raih keuntungan ini
              sekarang!
            </p>
          </div>

          <div>
            <FaFunnelDollar />
            <h4>100% PENGEMBALIAN DANA</h4>
            <p>
              Kepuasan pelanggan adalah prioritas utama kami. Jika Anda tidak
              puas dengan pembelian tanaman hias Anda dari Demeter, kami akan
              memberikan pengembalian uang penuh tanpa syarat dalam waktu 30
              hari. Tanaman hias kami dijamin tumbuh dengan baik dan sehat atau
              uang Anda kembali.
            </p>
          </div>

          <div>
            <FaUserShield />
            <h4>DUKUNGAN 24/7</h4>
            <p>
              Kami siap memberikan dukungan kapan saja selama 24 jam sehari, 7
              hari seminggu untuk membantu Anda dengan segala pertanyaan atau
              masalah yang Anda miliki terkait dengan produk tanaman hias kami.
              Silakan hubungi kami melalui email atau media sosial, dan kami
              akan dengan senang hati membantu Anda secepat mungkin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
