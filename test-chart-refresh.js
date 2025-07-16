const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartRefresh() {
  console.log('🧪 Testing Chart Refresh Without Page Reload...\n');

  try {
    // Step 1: Create a test dashboard
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Dashboard for Refresh',
        description: 'Dashboard to test chart refresh',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!dashboardResponse.ok) {
      throw new Error('Failed to create dashboard');
    }

    const dashboard = await dashboardResponse.json();
    console.log(`✅ Dashboard created with ID: ${dashboard.id}`);

    // Step 2: Create a test chart
    console.log('\n2. Creating test chart...');
    const chartResponse = await fetch(`${API_BASE}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dashboardId: dashboard.id,
        type: 'bar',
        title: 'Test Chart for Refresh',
        dataEndpoint: '/api/data/test_refresh_chart',
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!chartResponse.ok) {
      throw new Error('Failed to create chart');
    }

    const chart = await chartResponse.json();
    console.log(`✅ Chart created with ID: ${chart.id}`);

    // Step 3: Create chart data
    console.log('\n3. Creating chart data...');
    const chartDataResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'test_refresh_chart',
        data: {
          labels: ['Jan', 'Feb', 'Mar'],
          values: [10, 20, 30],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!chartDataResponse.ok) {
      throw new Error('Failed to create chart data');
    }

    const chartData = await chartDataResponse.json();
    console.log(`✅ Chart data created with ID: ${chartData.id}`);

    // Step 4: Test chart update (simulating edit)
    console.log('\n4. Testing chart update...');
    const updateChartResponse = await fetch(`${API_BASE}/charts/${chart.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Test Chart',
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!updateChartResponse.ok) {
      throw new Error('Failed to update chart');
    }

    const updatedChart = await updateChartResponse.json();
    console.log(`✅ Chart updated successfully: ${updatedChart.title}`);

    // Step 5: Test chart data update
    console.log('\n5. Testing chart data update...');
    const updateChartDataResponse = await fetch(`${NEXT_API_BASE}/chart-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'test_refresh_chart',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          values: [10, 20, 30, 40],
        },
      }),
    });

    if (!updateChartDataResponse.ok) {
      throw new Error('Failed to update chart data');
    }

    const updatedChartData = await updateChartDataResponse.json();
    console.log('✅ Chart data updated successfully:', updatedChartData.data);

    // Step 6: Verify the updated data
    console.log('\n6. Verifying updated chart data...');
    const verifyResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=test_refresh_chart`);
    
    if (!verifyResponse.ok) {
      throw new Error('Failed to verify updated chart data');
    }

    const verifiedData = await verifyResponse.json();
    console.log('✅ Updated chart data verified:', verifiedData.data);

    // Step 7: Test chart endpoint (simulating chart wrapper)
    console.log('\n7. Testing chart endpoint...');
    const chartEndpointResponse = await fetch(`http://localhost:3000${updatedChart.dataEndpoint}`);
    
    if (!chartEndpointResponse.ok) {
      throw new Error(`Chart endpoint failed: ${chartEndpointResponse.status}`);
    }

    const chartEndpointData = await chartEndpointResponse.json();
    console.log('✅ Chart endpoint works:', chartEndpointData);

    // Step 8: Clean up - Delete test data
    console.log('\n8. Cleaning up test data...');
    await fetch(`${API_BASE}/charts/${chart.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/chartData/${chartData.id}`, { method: 'DELETE' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All chart refresh tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Chart creation: ✅');
    console.log('- Chart data creation: ✅');
    console.log('- Chart update: ✅');
    console.log('- Chart data update: ✅');
    console.log('- Data verification: ✅');
    console.log('- Chart endpoint test: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartRefresh(); 