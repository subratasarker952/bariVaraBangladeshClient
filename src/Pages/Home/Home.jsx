import Features from "../../Components/HomePageCom/Features";
import Hero from "../../Components/HomePageCom/Hero";
import Testimonials from "../../Components/HomePageCom/Testimonials";
import Loading from "../../Components/SharedComponent/Loading";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { userLoading } = useAuth();
  if (userLoading) return <Loading />;
  return (
    <div className="text-center">
      <Hero />
      <Testimonials />
      <Features />
    </div>
  );
};

export default Home;
