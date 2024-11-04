const InfoItem = ({ title, body, icon, alt }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-fit rounded-full overflow-hidden bg-text2 p-2 border-[12px] border-[#c3c3c3]">
        <img src={icon} alt={alt} className="w-10 h-10" />
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-2">
        <p className="uppercase text-xl font-semibold font-Poppins">{title}</p>
        <p className="text-sm font-Poppins">{body}</p>
      </div>
    </div>
  );
};

export default InfoItem;
