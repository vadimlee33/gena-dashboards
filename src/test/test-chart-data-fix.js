const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartDataFix() {
  console.log('🧪 Testing Chart Data Loading Fix...\n');

  try {
    // Step 1: Get all chart data from database
    console.log('1. Fetching all chart data from database...');
    const chartDataResponse = await fetch(`${API_BASE}/chartData`);
    
    if (!chartDataResponse.ok) {
      throw new Error('Failed to fetch chart data');
    }

    const allChartData = await chartDataResponse.json();
    console.log(`✅ Found ${allChartData.length} chart data entries`);

    // Step 2: Test each endpoint through the Next.js API
    console.log('\n2. Testing each endpoint through Next.js API...');
    
    for (const chartData of allChartData) {
      const endpoint = chartData.endpoint;
      console.log(`\n--- Testing endpoint: ${endpoint} ---`);
      
      try {
        const response = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=${endpoint}`);
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ API Response success');
          
          // Check if data exists and has proper structure
          const data = result.data;
          if (data) {
            console.log('✅ Data found');
            
            // Test the data structure that the modal would use
            if (data.labels && Array.isArray(data.labels)) {
              console.log('✅ Labels array found:', data.labels.length, 'items');
              const labelsString = data.labels.join(', ');
              console.log('✅ Labels join test passed:', labelsString);
            }
            
            if (data.values && Array.isArray(data.values)) {
              console.log('✅ Values array found:', data.values.length, 'items');
              const valuesString = data.values.join(', ');
              console.log('✅ Values join test passed:', valuesString);
            }
            
            if (data.value !== undefined) {
              console.log('✅ Number value found:', data.value);
            }
          } else {
            console.log('⚠️ No data found in response');
          }
          
        } else {
          console.log(`❌ Failed to fetch: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`❌ Error testing endpoint ${endpoint}:`, error.message);
      }
    }

    console.log('\n🎉 Chart data loading fix test complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartDataFix(); 