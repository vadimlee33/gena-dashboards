const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartDataFormat() {
  console.log('🔍 Testing Chart Data Format...\n');

  try {
    // Get all chart data from the database
    console.log('1. Fetching all chart data from database...');
    const chartDataResponse = await fetch(`${API_BASE}/chartData`);
    
    if (!chartDataResponse.ok) {
      throw new Error('Failed to fetch chart data');
    }

    const allChartData = await chartDataResponse.json();
    console.log(`✅ Found ${allChartData.length} chart data entries`);

    // Test each endpoint through the Next.js API
    console.log('\n2. Testing each endpoint through Next.js API...');
    
    for (const chartData of allChartData) {
      const endpoint = chartData.endpoint;
      console.log(`\n--- Testing endpoint: ${endpoint} ---`);
      
      try {
        const response = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=${endpoint}`);
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ API Response:', JSON.stringify(result, null, 2));
          
          // Check data structure
          const data = result.data;
          console.log('📊 Data structure analysis:');
          console.log('- Type:', typeof data);
          console.log('- Keys:', Object.keys(data));
          
          if (data.labels) {
            console.log('- Labels type:', typeof data.labels);
            console.log('- Labels is array:', Array.isArray(data.labels));
            console.log('- Labels value:', data.labels);
          }
          
          if (data.values) {
            console.log('- Values type:', typeof data.values);
            console.log('- Values is array:', Array.isArray(data.values));
            console.log('- Values value:', data.values);
          }
          
          if (data.value !== undefined) {
            console.log('- Value:', data.value);
            console.log('- Label:', data.label);
            console.log('- Unit:', data.unit);
          }
          
        } else {
          console.log(`❌ Failed to fetch: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`❌ Error testing endpoint ${endpoint}:`, error.message);
      }
    }

    console.log('\n🎉 Chart data format analysis complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartDataFormat(); 