const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
