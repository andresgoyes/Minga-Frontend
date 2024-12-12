import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer.jsx';
import ScrollToTop from '../Components/ScrollToTop';
import {Outlet} from 'react-router-dom';

export default function StandarLayout() {
  return (
    <>
      <Navbar />      
      <main>
        <Outlet></Outlet>
      </main>      
      <ScrollToTop />
      <Footer />     
    </>
  );
}