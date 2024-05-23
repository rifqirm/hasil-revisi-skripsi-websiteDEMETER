import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { Hasil, ListCategories, Menus } from "../../components";
import Hasil from "../../components/HasilKeranjang/Hasil";
import ListCategories from "../../components/ListCategories/ListCategories";
import Menus from "../../components/DaftarProduk/Menus";
import { API_URL } from "../../utils/constants";
import axios from "axios";
// import swal from "sweetalert";
import Swal from "sweetalert2";

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      categoriYangDipilih: "Aglonema",
      keranjangs: [],
    };
  }

  componentDidMount() {
    this.fetchMenus(this.state.categoriYangDipilih);
    this.getListKeranjang();
  }

  fetchMenus = (category) => {
    axios
      .get(API_URL + "products?category.nama=" + category)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
    this.fetchMenus(value);
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const isiKeranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", isiKeranjang)
            .then((res) => {
              Swal.fire({
                title: "Sukses Masuk Keranjang",
                text:
                  "Sukses Masuk Keranjang Produk " + isiKeranjang.product.nama,
                icon: "success",
                confirmButtonColor: "#54B435", // Mengatur warna tombol "OKE"
              });
              this.getListKeranjang();
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        } else {
          const isiKeranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, isiKeranjang)
            .then((res) => {
              Swal.fire({
                title: "Sukses Masuk Keranjang",
                text:
                  "Sukses Masuk Keranjang Produk " + isiKeranjang.product.nama,
                icon: "success",
                confirmButtonColor: "#54B435", // Mengatur warna tombol "OKE"
              });
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categoriYangDipilih={categoriYangDipilih}
            />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
