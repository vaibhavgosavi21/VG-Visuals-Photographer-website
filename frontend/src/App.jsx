import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Feed from './pages/Feed';
import PostDetail from './pages/PostDetail';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUpload from './pages/AdminUpload';
import AdminManage from './pages/AdminManage';
import AdminPreview from './pages/AdminPreview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="feed" element={<Feed />} />
            <Route path="feed/:id" element={<PostDetail />} />
            <Route path="collections" element={<Collections />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="manage" element={<AdminManage />} />
            <Route path="preview" element={<AdminPreview />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
