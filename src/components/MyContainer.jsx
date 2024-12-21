const MyContainer = ({ children, ...props }) => {
  return (
    <div
      className="ml-auto mr-auto pl-8 pr-8 md:w-[750px] lg:w-[970px] xl:w-[1170px]"
      {...props}
    >
      {children}
    </div>
  );
};

export default MyContainer;
