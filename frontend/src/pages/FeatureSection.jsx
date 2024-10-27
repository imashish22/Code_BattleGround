import { features } from "../constants";

const FeatureSection = () => {
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 text-3xl rounded-full h-6  font-medium px-2 py-1 uppercase">
          Feature
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white mt-10 lg:mt-20 tracking-wide">
          Easily build{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            your code
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
  {features.map((feature, index) => (
    <div key={index} className="w-full sm:w-1/2 mt-5 lg:w-1/3">
      <div className="flex p-6 mx-4 bg-neutral-800 rounded-lg shadow-lg"> {/* Added padding, background, and shadow */}
        <div className="flex h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
          {feature.icon}
        </div>
        <div className="ml-4">
          <h5 className="mt-1 mb-2 text-xl text-white">{feature.text}</h5> {/* Adjusted text color */}
          <p className="text-md text-neutral-400">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FeatureSection;
