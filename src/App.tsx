// App.tsx
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import { ProductProvider } from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/Login";



function App() {
  return (
    <ProductProvider> 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
           <Route path="/cartpage" element={<CartPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;




