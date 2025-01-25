const FoodWebAnimation = () => {
  return (
    <div className="w-full bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <iframe
          title="Food Web"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/fd32a91331f048be9b94cf0cb8c312ed/embed"
        ></iframe>
        <div className="p-6 text-center text-gray-800">
          <p className="text-sm text-gray-600">
            <span>Food Web by </span>
            <a
              href="https://sketchfab.com/isparklekidz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              isparklekidz
            </a>
          </p>
          <p className="text-sm text-gray-500">
            View on{" "}
            <a
              href="https://sketchfab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sketchfab
            </a>
            .
          </p>
          <p className="text-xs text-gray-400 mt-2">
            For full 3D experience, make it fullscreen and rotate on
            mobile/tablet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodWebAnimation;
