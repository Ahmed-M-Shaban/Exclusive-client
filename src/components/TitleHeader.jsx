const TitleHeader = ({ title }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-5 h-10 bg-secondary2 rounded-[4px]" />
      <p className="capitalize text-secondary2 font-bold font-Poppins">
        {title}
      </p>
    </div>
  );
};

export default TitleHeader;
