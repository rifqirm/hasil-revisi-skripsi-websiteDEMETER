import React, { Component } from "react";
import { Link } from "react-router-dom";
import Styles from "../../styles/navbar.module.css";
import Logo from "../../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";

class Navbar extends Component {
  render() {
    return (
      <div className={Styles.header}>
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <ul className={Styles.topmenu}>
          <li>
            <Link to="/">Halaman Utama</Link>
          </li>
          <li>
            <Link to="/produkList">Urutan Produk</Link>
          </li>

          <li>
            <Link to="/requestproduk">Permintaan Produk</Link>
          </li>
          <li>
            <Link to="/about">Tentang</Link>
          </li>
          {/* <li><Link to="/">Homepage</Link></li>
                    <li><Link to="/">Homepage</Link></li> */}

          {/* -------------------Bahasa Inggris------------------------------ */}
          {/* <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/produkList">Produk List</Link>
          </li>

          <li>
            <Link to="/requestproduk">Request Produk</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li> */}
        </ul>
        <div className={Styles.cart}>
          <div className={Styles.iconCart}>
            <Link to="/keranjang">
              <FaShoppingCart className={Styles.cartIcon} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
