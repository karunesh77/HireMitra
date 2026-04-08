export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">HireMitra</h3>
            <p className="text-gray-400">
              Connecting skilled workers with employers across India. Find jobs or hire talent today.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/jobs" className="hover:text-white">Find Jobs</a></li>
              <li><a href="/auth/register" className="hover:text-white">Register</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Email: info@bluecollar.com</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} HireMitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
