import React, { Component } from "react";
import Styles from "../../styles/global.module.css";
import ImgAbout from "../../assets/about.png";

class AboutPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={Styles.row}>
          <div className={Styles.container}>
            <h2 className={Styles.text_center}>
              <strong>Tentang Kami</strong>
            </h2>
            <p>
              <strong
                style={{
                  fontSize: "24px",
                  display: "block",
                  textAlign: "center",
                }}
              >
                DEMETER
              </strong>
              <br />
              &emsp;&emsp;Demeter Tanaman Hias adalah platform toko online yang
              menyediakan berbagai macam jenis tanaman hias dengan kualitas
              terbaik dan harga yang terjangkau. Kami berkomitmen untuk
              memberikan pelayanan terbaik kepada pelanggan dengan menjual
              produk-produk berkualitas serta memberikan informasi dan saran
              mengenai perawatan tanaman. Kami memiliki tim ahli yang terdiri
              dari berbagai spesialisasi dalam bidang pertanian, hortikultura,
              dan tanaman hias, yang bertanggung jawab untuk memastikan bahwa
              semua produk yang kami jual memiliki kualitas terbaik dan siap
              untuk tumbuh dengan sehat.
            </p>
            <div className={Styles.space}></div>
            <div className={Styles.flex}>
              <img
                src={ImgAbout}
                style={{ width: "500px", height: "400px" }}
                alt="Gambar Tentang Kami"
              />
              <p className={Styles.margin_left}>
                <br />
                &emsp;&emsp;Selain itu, kami juga selalu berusaha untuk
                meningkatkan pengetahuan dan kesadaran masyarakat tentang
                pentingnya menjaga lingkungan dan keanekaragaman hayati dengan
                cara mempromosikan penggunaan tanaman hias dalam rumah,
                perkantoran, dan lingkungan sekitar. Kami memastikan bahwa
                setiap pelanggan kami mendapatkan pengalaman belanja yang
                memuaskan dengan pelayanan yang cepat, aman, dan terpercaya.
                Kami juga menawarkan layanan pengiriman ke seluruh Indonesia dan
                memberikan jaminan keamanan dalam pengiriman produk agar tetap
                tiba dalam kondisi baik.
              </p>
            </div>
            <div className={Styles.space}></div>
            <p>
              <br />
              &emsp;&emsp;Terima kasih telah memilih Demeter Tanaman Hias
              sebagai mitra untuk mempercantik rumah dan kehidupan Anda dengan
              tanaman hias yang indah dan berkualitas.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutPage;
