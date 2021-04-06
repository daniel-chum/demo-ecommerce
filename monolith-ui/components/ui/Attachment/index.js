const Attachment = (props) => {
  return (
    <div className="h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
      <div className="absolute">
        <div className="flex flex-col items-center ">
          <span className="block text-gray-400 font-normal">
            Attach you files here
          </span>
          <span className="block text-gray-400 font-normal">or</span>
          <button className="block text-blue-400 font-normal">
            Browse files
          </button>
        </div>
      </div>
      <input
        type="file"
        className="h-full w-full hidden"
        onChange={setImage}
        accept="image/*"
        // className="text-primary"
      />
    </div>
  );
};
