import FooterList from "./FooterList";
import Container from "../Container";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-100 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-3">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">DeskTops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accesssries</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-3">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-3">About Us</h3>
            <p className="mb-2">
              At our electronics store, we are dedicated to providing the latest
              and greatest devicesand accessories to our customers. with a wide
              selection phones, TVs, laptops, Watches and accessories
            </p>
            <p>&copy; {new Date().getFullYear()} E~Shop. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <FaFacebook size={24} className="text-slate-300" />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} className="text-slate-300" />
              </Link>
              <Link href="#">
                <RiInstagramFill size={24} className="text-slate-300" />
              </Link>
              <Link href="#">
                <FaLinkedin size={24} className="text-slate-300" />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
