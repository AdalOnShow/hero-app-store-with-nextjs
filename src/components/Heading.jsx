const Heading = ({ title, highlight }) => {
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
        {title}{" "}
        {highlight && (
          <span className="text-blue-500">{highlight}</span>
        )}
      </h1>
    </div>
  );
};

export default Heading;