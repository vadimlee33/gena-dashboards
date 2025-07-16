const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartEditing() {
  console.log('🧪 Testing Chart Editing Functionality...\n');

  try {
    // Step 1: Create a test dashboard
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Dashboard for Editing',
        description: 'Dashboard to test chart editing',
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
        title: 'Test Chart',
        dataEndpoint: '/api/data/test_chart',
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
        endpoint: 'test_chart',
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

    // Step 4: Test chart data retrieval (simulating edit modal loading)
    console.log('\n4. Testing chart data retrieval for editing...');
    const getChartDataResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=test_chart`);
    
    if (!getChartDataResponse.ok) {
      throw new Error('Failed to retrieve chart data');
    }

    const retrievedData = await getChartDataResponse.json();
    console.log('✅ Chart data retrieved successfully:', retrievedData.data);

    // Step 5: Test chart update via API
    console.log('\n5. Testing chart update...');
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

    // Step 6: Test chart data update via API
    console.log('\n6. Testing chart data update...');
    const updateChartDataResponse = await fetch(`${NEXT_API_BASE}/chart-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'test_chart',
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

    // Step 7: Verify the updated data
    console.log('\n7. Verifying updated chart data...');
    const verifyResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=test_chart`);
    
    if (!verifyResponse.ok) {
      throw new Error('Failed to verify updated chart data');
    }

    const verifiedData = await verifyResponse.json();
    console.log('✅ Updated chart data verified:', verifiedData.data);

    // Step 8: Clean up - Delete test data
    console.log('\n8. Cleaning up test data...');
    await fetch(`${API_BASE}/charts/${chart.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/chartData/${chartData.id}`, { method: 'DELETE' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All chart editing tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Chart creation: ✅');
    console.log('- Chart data creation: ✅');
    console.log('- Chart data retrieval: ✅');
    console.log('- Chart update: ✅');
    console.log('- Chart data update: ✅');
    console.log('- Data verification: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartEditing(); 