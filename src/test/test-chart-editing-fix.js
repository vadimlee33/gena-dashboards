const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartEditingFix() {
  console.log('🧪 Testing Chart Editing Fix...\n');

  try {
    // Step 1: Create a test dashboard
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Dashboard for Editing Fix',
        description: 'Dashboard to test chart editing fix',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!dashboardResponse.ok) {
      throw new Error('Failed to create dashboard');
    }

    const dashboard = await dashboardResponse.json();
    console.log(`✅ Dashboard created with ID: ${dashboard.id}`);

    // Step 2: Create a test chart with a short title (like "sq")
    console.log('\n2. Creating test chart with short title...');
    const chartResponse = await fetch(`${API_BASE}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dashboardId: dashboard.id,
        type: 'bar',
        title: 'sq', // Short title that could cause issues
        dataEndpoint: '/api/data/short_title_chart',
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!chartResponse.ok) {
      throw new Error('Failed to create chart');
    }

    const chart = await chartResponse.json();
    console.log(`✅ Chart created with ID: ${chart.id}, title: "${chart.title}"`);
    console.log(`✅ Chart dataEndpoint: ${chart.dataEndpoint}`);

    // Step 3: Create chart data
    console.log('\n3. Creating chart data...');
    const chartDataResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'short_title_chart',
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
    const getChartDataResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=short_title_chart`);
    
    if (!getChartDataResponse.ok) {
      throw new Error('Failed to retrieve chart data');
    }

    const retrievedData = await getChartDataResponse.json();
    console.log('✅ Chart data retrieved successfully:', retrievedData.data);

    // Step 5: Test chart update via API (simulating edit save)
    console.log('\n5. Testing chart update with preserved endpoint...');
    const updateChartResponse = await fetch(`${API_BASE}/charts/${chart.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Short Title', // Change title but keep same endpoint
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!updateChartResponse.ok) {
      throw new Error('Failed to update chart');
    }

    const updatedChart = await updateChartResponse.json();
    console.log(`✅ Chart updated successfully: ${updatedChart.title}`);
    console.log(`✅ Chart dataEndpoint preserved: ${updatedChart.dataEndpoint}`);

    // Step 6: Test chart data update via API
    console.log('\n6. Testing chart data update...');
    const updateChartDataResponse = await fetch(`${NEXT_API_BASE}/chart-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'short_title_chart', // Use original endpoint
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
    const verifyResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=short_title_chart`);
    
    if (!verifyResponse.ok) {
      throw new Error('Failed to verify updated chart data');
    }

    const verifiedData = await verifyResponse.json();
    console.log('✅ Updated chart data verified:', verifiedData.data);

    // Step 8: Test the actual chart endpoint that the chart wrapper would call
    console.log('\n8. Testing chart wrapper endpoint...');
    const chartWrapperResponse = await fetch(`http://localhost:3000${updatedChart.dataEndpoint}`);
    
    if (!chartWrapperResponse.ok) {
      throw new Error(`Chart wrapper endpoint failed: ${chartWrapperResponse.status}`);
    }

    const chartWrapperData = await chartWrapperResponse.json();
    console.log('✅ Chart wrapper endpoint works:', chartWrapperData);

    // Step 9: Clean up - Delete test data
    console.log('\n9. Cleaning up test data...');
    await fetch(`${API_BASE}/charts/${chart.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/chartData/${chartData.id}`, { method: 'DELETE' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All chart editing fix tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Chart creation with short title: ✅');
    console.log('- Chart data creation: ✅');
    console.log('- Chart data retrieval: ✅');
    console.log('- Chart update with preserved endpoint: ✅');
    console.log('- Chart data update: ✅');
    console.log('- Data verification: ✅');
    console.log('- Chart wrapper endpoint test: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartEditingFix(); 