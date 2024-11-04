import Hero from "../components/Hero";
import LineBreak from "../components/LineBreak";
import Today from "../components/Today";
import Categories from "../components/Categories";
import ThisMonth from "../components/ThisMonth";
import OurProducts from "../components/OurProducts";
import Info from "../components/Info";

const Home = () => {
  return (
    <main className="flex flex-col gap-8 common-margin">
      <Hero />
      <Today />
      <LineBreak />
      <Categories />
      <LineBreak />
      <ThisMonth />
      <OurProducts />
      <Info />
    </main>
  );
};

export default Home;
