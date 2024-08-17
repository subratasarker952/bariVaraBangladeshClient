import { Link } from "react-router-dom";
import houseBanner from "../../assets/images/housebanner.jpg";

const Hero = () => {
  return (
    <div
      className="hero bg-blue-400 min-h-[600px]"
      style={{
        backgroundImage: `url(${houseBanner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Find Your Perfect Rental Home</h1>
          <p className="py-6">
            Browse through the best rental properties available.
          </p>
          <Link to={"/listing"} className="btn btn-primary">
            See Rental Lists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
