import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SponsorSection from "../components/SponsorSection";
import TrashBinMap from "../components/TrashBinMap";
import { getTrashCounts } from "../lib/actions";

export default async function Home() {
  // Fetch trash counts from MongoDB
  const trashData = await getTrashCounts();

  // Calculate percentages
  const total = trashData.total || 0;
  const recyclablePercentage =
    total > 0 ? Math.round((trashData.recyclable / total) * 100) : 0;
  const compostPercentage =
    total > 0 ? Math.round((trashData.compost / total) * 100) : 0;
  const landfillPercentage =
    total > 0 ? Math.round((trashData.landfill / total) * 100) : 0;
  const otherPercentage =
    100 - recyclablePercentage - compostPercentage - landfillPercentage;

  return (
    <div className="min-h-screen bg-[#FAFCF3]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="h-screen w-full mb-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/nature.jpg"
              alt="Nature background"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-5xl font-bold text-white mb-6">
              Smart Trash Categorization
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8">
              Our AI-powered system automatically identifies and categorizes
              trash, helping communities reduce waste and improve recycling
              rates.
            </p>
            <a
              href="#mission"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </section>

        <div className="container flex flex-col justify-center items-center mx-auto w-full lg:w-1/2 px-4 py-8">
          {/* Our Mission Section - Added scroll-margin-top */}
          <section id="mission" className="mb-16 bg-white py-16 scroll-mt-36">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-green-700 max-w-3xl mx-auto text-center">
                TrashAid is committed to reducing environmental impact through
                smart waste management. Our AI-powered system helps communities
                properly categorize and dispose of waste, leading to higher
                recycling rates and a cleaner planet.
              </p>
            </div>
          </section>

          {/* Add Trash Bin Map Section before the dashboard */}
          <section id="trash-bins" className="mb-16 w-full scroll-mt-36">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              Trash Bin Locations
            </h2>
            <TrashBinMap />
          </section>

          {/* Dashboard Section - Added scroll-margin-top */}
          <section id="dashboard" className="mb-16 scroll-mt-36">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              Trash Categorization Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stats Card 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {total}
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Items Categorized
                </h3>
                <p className="text-green-600">
                  Total trash items processed by our system
                </p>
              </div>

              {/* Stats Card 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {recyclablePercentage}%
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Recyclable
                </h3>
                <p className="text-green-600">
                  Percentage of items that can be recycled
                </p>
              </div>

              {/* Stats Card 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {100 - recyclablePercentage}%
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Non-Recyclable
                </h3>
                <p className="text-green-600">
                  Percentage of items that need proper disposal
                </p>
              </div>
            </div>

            {/* Trash Categories */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Trash Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-green-700">
                      Recyclable
                    </h4>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {recyclablePercentage}%
                  </div>
                  <p className="text-blue-600">of categorized items</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-green-700">
                      Compost
                    </h4>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {compostPercentage}%
                  </div>
                  <p className="text-green-600">of categorized items</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-green-700">
                      Landfill
                    </h4>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">
                    {landfillPercentage}%
                  </div>
                  <p className="text-yellow-600">of categorized items</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-green-700">
                      Other
                    </h4>
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    {otherPercentage}%
                  </div>
                  <p className="text-red-600">of categorized items</p>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Impact Section - Added scroll-margin-top */}
          <section
            id="impact"
            className="mb-16 bg-white rounded-lg shadow-lg p-8 scroll-mt-36"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              Environmental Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  CO2 Reduction
                </h3>
                <p className="text-xl text-green-600 mb-4">{total} kg</p>
                <p className="text-center text-green-600">
                  By properly categorizing and recycling trash, we&apos;ve
                  reduced CO2 emissions equivalent to planting{" "}
                  {Math.round(total / 20)} trees.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  Water Saved
                </h3>
                <p className="text-xl text-green-600 mb-4">
                  {total * 3} liters
                </p>
                <p className="text-center text-green-600">
                  Through proper waste management, we&apos;ve saved water
                  equivalent to {Math.round((total * 3) / 250)} days of
                  household usage.
                </p>
              </div>
            </div>
          </section>

          {/* Sponsor Section - Added scroll-margin-top */}
          <section id="sponsor" className="scroll-mt-36">
            <SponsorSection />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
