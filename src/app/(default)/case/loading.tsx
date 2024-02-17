const Loading = () => (
  <div className="px-20">
    <div className="mb-8 h-8 w-[200px] skeleton" />
    <div className="p-4 flex items-center space-x-4 rounded-md bg-gray-100 h-20 mb-5">
      <div className="h-4 w-4 skeleton rounded-full mx-4" />
      <div className="h-11 w-16 skeleton rounded-full" />
      <div className="h-11 w-16 skeleton rounded-full" />
      <div className="h-11 w-16 skeleton rounded-full" />
    </div>
    <div className="h-12 w-full mb-2 skeleton" />
    <div className="h-10 w-full mb-2 skeleton" />
    <div className="h-10 w-full mb-2 skeleton" />
  </div>
);

export default Loading;
