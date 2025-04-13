export default function Footer() {
  return (
    <footer className="bg-green-50 text-green-700 py-8 border-t border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">TrashAid</h3>
            <p className="text-green-600">
              Smart trash categorization for a cleaner planet
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-green-600 hover:text-green-800 text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-green-600 hover:text-green-800 text-xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-green-600 hover:text-green-800 text-xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-green-600 hover:text-green-800 text-xl">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-green-600">
          <p>
            &copy; {new Date().getFullYear()} TrashAid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
