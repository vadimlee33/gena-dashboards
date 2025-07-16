import React from 'react';

const TestTailwind: React.FC = () => {
  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Tailwind CSS Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Primary Colors
            </h2>
            <div className="space-y-2">
              <div className="h-8 bg-primary-500 rounded flex items-center justify-center text-white font-medium">
                Primary 500
              </div>
              <div className="h-8 bg-primary-600 rounded flex items-center justify-center text-white font-medium">
                Primary 600
              </div>
              <div className="h-8 bg-primary-700 rounded flex items-center justify-center text-white font-medium">
                Primary 700
              </div>
            </div>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Success Colors
            </h2>
            <div className="space-y-2">
              <div className="h-8 bg-success-500 rounded flex items-center justify-center text-white font-medium">
                Success 500
              </div>
              <div className="h-8 bg-success-600 rounded flex items-center justify-center text-white font-medium">
                Success 600
              </div>
              <div className="h-8 bg-success-700 rounded flex items-center justify-center text-white font-medium">
                Success 700
              </div>
            </div>
          </div>

          {/* Test Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Danger Colors
            </h2>
            <div className="space-y-2">
              <div className="h-8 bg-danger-500 rounded flex items-center justify-center text-white font-medium">
                Danger 500
              </div>
              <div className="h-8 bg-danger-600 rounded flex items-center justify-center text-white font-medium">
                Danger 600
              </div>
              <div className="h-8 bg-danger-700 rounded flex items-center justify-center text-white font-medium">
                Danger 700
              </div>
            </div>
          </div>

          {/* Test Card 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Buttons
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Primary Button
              </button>
              <button className="w-full bg-success-600 hover:bg-success-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Success Button
              </button>
              <button className="w-full bg-danger-600 hover:bg-danger-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Danger Button
              </button>
            </div>
          </div>

          {/* Test Card 5 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Typography
            </h2>
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Extra Small Text</p>
              <p className="text-sm text-gray-600">Small Text</p>
              <p className="text-base text-gray-600">Base Text</p>
              <p className="text-lg text-gray-600">Large Text</p>
              <p className="text-xl text-gray-600">Extra Large Text</p>
            </div>
          </div>

          {/* Test Card 6 */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Spacing & Layout
            </h2>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-400 rounded"></div>
              <div className="h-10 bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Tailwind CSS is working!
          </h3>
          <p className="text-green-700">
            If you can see this styled content, Tailwind CSS v4 is properly configured and working.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind; 