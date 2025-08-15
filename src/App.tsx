// App.tsx
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import { ProductProvider } from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
    <ProductProvider> 
      <Router>
        <Header />
    
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;




