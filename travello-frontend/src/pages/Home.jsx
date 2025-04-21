// Components
import Header from "../components/Header";
import Search from "../components/Search";
import Map from "../components/Map";
import PlaceGrid from "../components/PlaceGrid";
import Footer from "../components/Footer";
import { useState } from "react";

const Home = () => {
  const [resultData, setResultData] = useState([]);

  return (
    <>
      <Header />
      <Search setResultData={setResultData} />
      <Map />
      <PlaceGrid resultData={resultData} />
      <Footer />
    </>
  );
};

export default Home;
