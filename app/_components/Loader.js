
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image width={96}
      height={96} src="/loading2.gif" alt="Loading..." className="h-24 w-24" />
      

    </div>
  );
};

export default Loader;
