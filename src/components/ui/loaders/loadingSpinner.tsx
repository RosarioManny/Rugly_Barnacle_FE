export const Spinner = ({  
  width = "w-6", 
  height = "h-6", 
  borderColor = "border-majorelle",
  borderWidth = "border-4",
  loading = true
}) => {
  return (
    <div className="justify-center flex flex-col gap-5 items-center">
      <div 
        className={`
          ${width} 
          ${height} 
          ${borderColor} 
          ${borderWidth}
          rounded-full
          border-solid
          border-l-transparent
          inline-block 
          animate-spin
          scale-150
        `}
      ></div>
      {loading &&
        <p className="text-majorelle font-semibold text-[1.4rem] animate-pulse">Loading...</p>
      }
    </div>
  );
};
