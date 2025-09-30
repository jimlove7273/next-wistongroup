const HomeBrandList = () => {
  return (
    <div className="bg-blue-200 pb-2 mb-6">
      <div className="text-center py-4 text-2xl font-semibold">
        Featured Brands
      </div>
      <div className="lg:w-2/3 p-6 mx-auto flex gap-4 overflow-auto scrollbar-container">
        <img src="/brands/amd.gif" alt="amd" className="h-[40px]" />
        <img src="/brands/asus.gif" alt="asus" className="h-[40px]" />
        <img src="/brands/intel.gif" alt="intel" className="h-[40px]" />
        <img src="/brands/kingston.gif" alt="kingston" className="h-[40px]" />
        <img src="/brands/linksys.gif" alt="linksys" className="h-[40px]" />
        <img src="/brands/liteon.png" alt="LiteOn" className="h-[40px]" />
        <img src="/brands/logitech.gif" alt="logitech" className="h-[40px]" />
        <img src="/brands/msi.gif" alt="msi" className="h-[40px]" />
        <img src="/brands/nec.gif" alt="nec" className="h-[40px]" />
        <img
          src="/brands/prudentway.gif"
          alt="prudentway"
          className="h-[40px]"
        />
        <img src="/brands/samsung.gif" alt="samsung" className="h-[40px]" />
        <img src="/brands/seagate.gif" alt="seagate" className="h-[40px]" />
        <img src="/brands/sony.png" alt="Sony" className="h-[40px]" />
        <img src="/brands/syba.gif" alt="syba" className="h-[40px]" />
        <img src="/brands/tplink.gif" alt="tplink" className="h-[40px]" />
        <img src="/brands/wt.gif" alt="wt" className="h-[40px]" />
      </div>
    </div>
  );
};

export default HomeBrandList;
