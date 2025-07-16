const API_BASE = 'http://localhost:3001';

async function testChartDataLoading() {
  console.log('Testing chart data loading...\n');

  try {
    console.log('1. Testing existing chart data...');
    const existingEndpoints = ['total_revenue', 'orders_over_time', 'signups_by_region'];
    
    for (const endpoint of existingEndpoints) {
      console.log(`\nTesting endpoint: ${endpoint}`);
      
      const response = await fetch(`${API_BASE}/chartData?endpoint=${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Found data for ${endpoint}:`, data.length > 0 ? 'Data exists' : 'No data');
        
        if (data.length > 0) {
          const chartData = data[0];
          console.log('Data structure:', {
            hasLabels: !!chartData.data.labels,
            hasValues: !!chartData.data.values,
            hasValue: chartData.data.value !== undefined,
            labelsCount: chartData.data.labels?.length || 0,
            valuesCount: chartData.data.values?.length || 0
          });
        }
      } else {
        console.log(`❌ Failed to get data for ${endpoint}`);
      }
    }

    console.log('\n2. Testing new chart data endpoints...');
    const newEndpoints = ['test_number_chart', 'test_bar_chart', 'test_line_chart'];
    
    for (const endpoint of newEndpoints) {
      console.log(`\nTesting endpoint: ${endpoint}`);
      
      const response = await fetch(`${API_BASE}/chartData?endpoint=${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Found data for ${endpoint}:`, data.length > 0 ? 'Data exists' : 'No data');
        
        if (data.length > 0) {
          const chartData = data[0];
          console.log('Data structure:', {
            hasLabels: !!chartData.data.labels,
            hasValues: !!chartData.data.values,
            hasValue: chartData.data.value !== undefined,
            labelsCount: chartData.data.labels?.length || 0,
            valuesCount: chartData.data.values?.length || 0
          });
        }
      } else {
        console.log(`❌ Failed to get data for ${endpoint}`);
      }
    }

    console.log('\n3. Testing Next.js API endpoints...');
    const nextApiEndpoints = ['/api/data/total_revenue', '/api/data/orders_over_time', '/api/data/signups_by_region'];
    
    for (const endpoint of nextApiEndpoints) {
      console.log(`\nTesting Next.js endpoint: ${endpoint}`);
      
      try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Next.js API working for ${endpoint}`);
          console.log('Response structure:', {
            hasData: !!data.data,
            hasLabels: !!data.data?.labels,
            hasValues: !!data.data?.values,
            hasValue: data.data?.value !== undefined
          });
        } else {
          console.log(`❌ Next.js API failed for ${endpoint}: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Error testing Next.js API for ${endpoint}:`, error.message);
      }
    }

    console.log('\n🎉 Chart data loading test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testChartDataLoading(); 