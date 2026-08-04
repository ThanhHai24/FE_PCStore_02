import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4 py-8 w-full">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-2.5 h-8 bg-blue-600 rounded-full"></span>
            <h1 className="text-2xl font-black text-gray-900">Hệ Thống PC Store & Linh Kiện Máy Tính Cao Cấp</h1>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            Chào mừng bạn đến với hệ thống Nguyễn Công PC - Chuyên cung cấp PC Gaming, Workstation AI, Laptop và Linh kiện máy tính chính hãng hàng đầu Việt Nam.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;