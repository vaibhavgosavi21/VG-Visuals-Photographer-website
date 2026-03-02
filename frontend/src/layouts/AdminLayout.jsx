import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUpload, FiSettings, FiLogOut, FiCamera, FiEye } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-secondary border-r border-gray-800 fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <FiCamera className="text-accent text-2xl" />
            <span className="text-xl font-bold">VG Visuals</span>
          </Link>

          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary transition-colors"
            >
              <FiHome />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/upload"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary transition-colors"
            >
              <FiUpload />
              <span>Upload</span>
            </Link>
            <Link
              to="/admin/manage"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary transition-colors"
            >
              <FiSettings />
              <span>Manage Posts</span>
            </Link>
            <Link
              to="/admin/preview"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary transition-colors text-accent"
            >
              <FiEye />
              <span>Visitor Preview</span>
            </Link>
            
            <div className="border-t border-gray-700 my-4"></div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary transition-colors text-red-500"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
