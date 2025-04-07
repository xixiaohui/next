import Image from "next/image";

const MyCard = () => {
  const imageSrc =
    "https://compocore.com/wp-content/uploads/2022/12/laia-nunez-AThSwV0LsCQ-unsplash-scaled.jpg";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="flex justify-center">
        <Image
          src={imageSrc} // 外部图片 URL
          alt="Example Image"
          width={400}
          height={300}
          blurDataURL="data:image/jpeg;base64"
          quality={75}
        />
      </div>
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl">Card Title</h3>
        <p className="text-gray-700 text-base">
          This is a sample description for the card.
        </p>
      </div>
    </div>
  );
};

export default MyCard;
