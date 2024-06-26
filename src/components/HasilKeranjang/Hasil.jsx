import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Card } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import ModalKeranjang from "../ModalKeranjang/ModalKeranjang";
import TotalBayar from "../TotalBayar/TotalBayar";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan Produk!",
          text: "Sukses Update Pesanan Produk " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
        this.props.getListKeranjang();
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();
    Swal.fire({
      title: "Apakah Anda yakin?",
      text:
        "Hapus Produk " +
        this.state.keranjangDetail.product.nama +
        " Ini Dari Keranjang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#54B435",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API_URL + "keranjangs/" + id)
          .then((result) => {
            this.props.getListKeranjang();
            swal({
              title: "Menghapus",
              text: "Produk Pesanan Berhasil Di Hapus",
              icon: "success",
              button: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Dibatalkan",
          text: "Produk Batal Di Hapus",
          icon: "error",
          confirmButtonColor: "#54B435",
        });
      }
    });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Keranjang</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush" style={{ cursor: "pointer" }}>
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                  style={{ backgroundColor: "#a5d5951f" }} // Added styles here
                >
                  <Row>
                    <Col xs={2}>
                      <h5>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h5>
                    </Col>
                    <Col>
                      <h6>{menuKeranjang.product.nama}</h6>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                kurang={this.kurang}
                tambah={this.tambah}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
