const FooterItem = ({ header, items }) => {
  return (
    <div className="flex flex-col gap-4 max-w-44 min-w-32 mx-auto">
      <h3 className="text-xl font-semibold capitalize">{header}</h3>
      {items.map((item, i) => (
        <p key={i} className="capitalize">
          {item}
        </p>
      ))}
    </div>
  );
};

export default FooterItem;
