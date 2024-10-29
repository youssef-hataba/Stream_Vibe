import Image from 'next/image'; // Use default import

const PrevButton = ({onClick}) => {
  return (
    <div className='flex items-center w-12 h-12 justify-center rounded-lg border
    border-black-12 bg-black-6 hover:bg-black-12 hover:scale-95 duration-100 transition-all' onClick={onClick}>
      <Image
        src="/images/icons/Vector.png"
        alt="vector image"
        width={21} 
        height={17}
      />
    </div>
  );
}

export default PrevButton;
