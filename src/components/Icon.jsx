const Icon = ({ icon, alt, iconClass, onClick }) => {
  return (
    <img
      src={icon}
      alt={alt}
      onClick={onClick}
      className={`w-8 h-8 ${iconClass}`}
    />
  );
};

export default Icon;
