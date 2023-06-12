import { Inter } from "next/font/google";
import HomePage from "../app-pages/HomePage";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return <HomePage />;
};

export default Home;
