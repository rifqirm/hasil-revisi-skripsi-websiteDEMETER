import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import "./TotalBayar.css";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons"; // Import icon

function TotalBayar(props) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({
    nama: "",
    nomorHP: "",
    email: "",
    noKtp: "",
    alamat: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    nama: "",
    nomorHP: "",
    email: "",
    noKtp: "",
    alamat: "",
  });

  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: props.keranjangs,
      customer: form,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        navigate("/sukses");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error if needed
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    const { nama, nomorHP, email, noKtp, alamat } = form;

    if (!nama) {
      formIsValid = false;
      errors["nama"] = "Nama lengkap wajib diisi";
    }

    if (!nomorHP) {
      formIsValid = false;
      errors["nomorHP"] = "Nomor Handphone wajib diisi";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email wajib diisi";
    } else {
      let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!pattern.test(email)) {
        formIsValid = false;
        errors["email"] = "Format email tidak valid";
      }
    }

    if (!noKtp) {
      formIsValid = false;
      errors["noKtp"] = "Nomor NIK KTP wajib diisi";
    } else {
      let pattern = /^[0-9]{16}$/;
      if (!pattern.test(noKtp)) {
        formIsValid = false;
        errors["noKtp"] = "Nomor NIK KTP harus terdiri dari 16 digit angka";
      }
    }

    if (!alamat) {
      formIsValid = false;
      errors["alamat"] = "Alamat wajib diisi";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalBayar = props.keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
      }, 0);
      submitTotalBayar(totalBayar);
    }
  };

  const totalBayar = props.keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  const keranjangsEmpty = props.keranjangs.length === 0;

  return (
    <>
      {/* Web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col className="ms-3 mt-3 bayar">
            <center>
              <h5>
                Total Harga :{" "}
                <strong>Rp. {numberWithCommas(totalBayar)}</strong>
              </h5>
            </center>
            <Button
              variant="secondary"
              className={`mb-3 mt-3 mr-3 buttonBayar ${
                keranjangsEmpty ? "disabled" : ""
              }`}
              size="md"
              onClick={() => setShowModal(true)}
              disabled={keranjangsEmpty}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="ms--5 me-2" />{" "}
              <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col className="ms-3 mt-3 bayar">
            <h5>
              Total Harga :{" "}
              <strong className="float-right px-5">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h5>
            <Button
              variant="secondary"
              className={`mb-3 mt-3 mr-3 buttonBayar ${
                keranjangsEmpty ? "disabled" : ""
              }`}
              size="md"
              onClick={() => setShowModal(true)}
              disabled={keranjangsEmpty}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="ms--5 me-2" />{" "}
              <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faFileAlt} className="me-2" />
            Formulir Pemesanan Produk
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nama">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama lengkap Anda!"
                name="nama"
                value={form.nama}
                onChange={handleInputChange}
              />
              <span className="text-danger">{formErrors.nama}</span>
            </Form.Group>

            <Form.Group controlId="nomorHP">
              <Form.Label>Nomor Handphone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan nomor HP Anda!"
                name="nomorHP"
                value={form.nomorHP}
                onChange={handleInputChange}
              />
              <span className="text-danger">{formErrors.nomorHP}</span>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email Anda!"
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
              <span className="text-danger">{formErrors.email}</span>
            </Form.Group>

            <Form.Group controlId="noKtp">
              <Form.Label>Nomor NIK KTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nomor NIK KTP Anda (16 digit angka)!"
                name="noKtp"
                value={form.noKtp}
                onChange={handleInputChange}
              />
              <span className="text-danger">{formErrors.noKtp}</span>
            </Form.Group>

            <Form.Group controlId="alamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan alamat lengkap Anda!"
                name="alamat"
                value={form.alamat}
                onChange={handleInputChange}
              />
              <span className="text-danger">{formErrors.alamat}</span>
            </Form.Group>

            <center>
              <h5 className="totalbayarform">
                Total Harga :{" "}
                <strong>Rp. {numberWithCommas(totalBayar)}</strong>
              </h5>
            </center>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit">
                PESAN SEKARANG
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TotalBayar;
