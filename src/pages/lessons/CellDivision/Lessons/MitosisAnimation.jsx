const MitosisAnimation = () => {
  return (
    <div className="w-full bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <iframe
          title="Mitosis Stages - Cell Division"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/821f09436c4f4ce487cdf3b2a40364b3/embed"
        ></iframe>
        <div className="p-6 text-center text-gray-800">
          <p className="text-sm text-gray-600">
            <span>Mitosis Stages - Cell Division by</span>
            <a
              href="https://sketchfab.com/arloopa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              Arloopa
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

export default MitosisAnimation;
