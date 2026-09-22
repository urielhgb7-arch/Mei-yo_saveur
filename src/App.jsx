import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import TrustBar from "./components/TrustBar";
import ProductGrid from "./components/ProductGrid";
import Testimonials from "./components/Testimonials";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Story />
      <TrustBar />
      <ProductGrid />
      <Testimonials />
      <Footer />
      <CartSidebar />
    </CartProvider>
  );
}
