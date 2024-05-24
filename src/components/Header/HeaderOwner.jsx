// import logo from '../../assets/Bootstrap_logo.svg.png'; // with import
import logo from "../../assets/logo-owner-update.svg";
import HeaderBody from "../../elements/HeaderBody/HeaderBody";
import HeaderTitle from "../../elements/HeaderTitle/HeaderTitle";
import Button from "../../elements/Button/Button";
import { useState } from "react";

const HeaderOwner = () => {
  const article = {
    title: {
      id: "Memperbarui Permintaan Produk",
      en: "Update Product Request",
    },
    description: {
      id: "Di bawah ini adalah formulir yang dibuat untuk memperbarui atau menyetujui produk yang diminta oleh admin. Semua saran atau permintaan penambahan produk akan kami seleksi secara menyeluruh, terima kasih. 😊",
      en: "Below is a form created to update or approve a requested product by admin. All suggestions or product addition requests will be thoroughly reviewed. Thank you. 😊",
    },
  };

  const [title, setTitle] = useState(article.title.en);
  const [desc, setDesc] = useState(article.description.en);

  const changeLanguage = () => {
    setTitle(title === article.title.en ? article.title.id : article.title.en);
    setDesc(
      desc === article.description.en
        ? article.description.id
        : article.description.en
    );
  };

  return (
    <div className="container text-center">
      <img style={{ height: 300, width: "300px" }} src={logo} alt="Hero Logo" />
      <div className="container mt-4">
        <HeaderTitle label={title} />
        <HeaderBody label={desc} />
      </div>
      <Button
        className="btn btn-primary"
        label="Ganti Bahasa"
        onClick={() => changeLanguage()}
      />
    </div>
  );
};

export default HeaderOwner;
