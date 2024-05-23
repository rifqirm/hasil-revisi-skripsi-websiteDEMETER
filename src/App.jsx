import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/HalamanUtama/homepage";
import CartPage from "./pages/Keranjang/cart";
import Sukses from "./pages/Sukses/Sukses";
import ProductPage from "./pages/Produk/product";
// import ProductDetailPage from "./pages/product_detail";
import AboutPage from "./pages/Tentang/about";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
// import ProductDetailPage1 from "./productDetail/product_detail1";
// import ProductDetailPage2 from "./productDetail/product_detail2";
// import ProductDetailPage3 from "./productDetail/product_detail3";
// import ProductDetailPage4 from "./productDetail/product_detail4";

import CreateProduct from "./pages/CreateProduct/CreateProduct";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import UpdateCreateProduct from "./pages/UpdateCreateProduct/UpdateCreateProduct";
// import ProductsContext from './components/context/ProductsContext';
// import LoginPage from './pages/LoginPage/LoginPage'
// import PrivateRoute from './routes/PrivateRoute';

function App() {
  // const [products, setProducts] = useState([])
  // const value = {products, setProducts}

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/produkList" element={<ProductPage />} />
        {/* <Route path="/product/:url" element={<ProductDetailPage />} />
          <Route path="/product1/" element={<ProductDetailPage1 />} />
          <Route path="/product2/" element={<ProductDetailPage2 />} />
          <Route path="/product3/" element={<ProductDetailPage3 />} />
          <Route path="/product4/" element={<ProductDetailPage4 />} /> */}
        {/* <Route path="/contactpage" element={<ContactPage />} /> */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/requestproduk" element={<CreateProduct />} />
        <Route
          path="/admin-updaterequestproduct"
          element={<UpdateCreateProduct />}
        />
        <Route path="/detailproduct/:productId" element={<DetailProduct />} />
        {/* </Route> */}
        <Route path="/detailproduct/:productId" element={<DetailProduct />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/sukses" element={<Sukses />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
