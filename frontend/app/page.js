import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white py-20 animate-fadeIn">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Skilled Workers.<br />Hire Quality Professionals.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with talented plumbers, electricians, and skilled professionals near you. Fast. Reliable. Verified.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/jobs" className="btn-primary text-lg px-8 py-4 inline-block hover:scale-110">
              🔍 Find Jobs
            </Link>
            <Link href="/auth/register" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all inline-block">
              📝 Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600 mt-2">Active Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">1000+</p>
              <p className="text-gray-600 mt-2">Workers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">250+</p>
              <p className="text-gray-600 mt-2">Employers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">99%</p>
              <p className="text-gray-600 mt-2">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <h2 className="section-header">Why Choose Blue-Collar?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card hover-lift">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Find Local Professionals</h3>
            <p className="text-gray-700 leading-relaxed">
              Discover skilled workers near you instantly. Filter by skills, experience, location, and ratings to find the perfect fit for your job.
            </p>
          </div>

          <div className="card hover-lift">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Verified Ratings & Reviews</h3>
            <p className="text-gray-700 leading-relaxed">
              Real reviews from actual employers. Make informed decisions with verified worker ratings and detailed feedback about their quality of work.
            </p>
          </div>

          <div className="card hover-lift">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Quick & Simple Hiring</h3>
            <p className="text-gray-700 leading-relaxed">
              Post your job in minutes and get connected with qualified workers instantly. No complicated processes, just results.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="section-header">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Workers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">For Workers</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sign Up</h4>
                    <p className="text-gray-600">Create your profile with your skills and experience</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Browse Jobs</h4>
                    <p className="text-gray-600">Find jobs near you matching your skills</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Apply & Earn</h4>
                    <p className="text-gray-600">Apply to jobs and start earning immediately</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">For Employers</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Register</h4>
                    <p className="text-gray-600">Create your company profile</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Post Jobs</h4>
                    <p className="text-gray-600">Describe the job and required skills</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hire & Manage</h4>
                    <p className="text-gray-600">Review applications and hire the best workers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 animate-slideInUp">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of workers and employers who are already using Blue-Collar to find jobs and hire talent.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all inline-block"
            >
              Create Free Account →
            </Link>
            <Link
              href="/jobs"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all inline-block"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container text-center">
          <h3 className="text-2xl font-bold mb-4">Questions?</h3>
          <p className="text-gray-600 mb-6">
            Contact us at <a href="mailto:support@hiremitra.com" className="text-blue-600 hover:underline">support@hiremitra.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
