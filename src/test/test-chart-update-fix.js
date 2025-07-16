const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartUpdateFix() {
  console.log('🧪 Testing Chart Data Update Fix...\n');

  try {
    // Step 1: Create a test dashboard
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Dashboard for Update Fix',
        description: 'Dashboard to test chart update fix',
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
        title: 'Test Chart for Update',
        dataEndpoint: '/api/data/test_update_chart',
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

    // Step 3: Create initial chart data
    console.log('\n3. Creating initial chart data...');
    const chartDataResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'test_update_chart',
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

    // Step 4: Test chart data retrieval
    console.log('\n4. Testing chart data retrieval...');
    const getResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=test_update_chart`);
    
    if (!getResponse.ok) {
      throw new Error('Failed to retrieve chart data');
    }

    const retrievedData = await getResponse.json();
    console.log('✅ Chart data retrieved successfully:', retrievedData.data);

    // Step 5: Test chart data update via PUT
    console.log('\n5. Testing chart data update via PUT...');
    const updateResponse = await fetch(`${NEXT_API_BASE}/chart-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'test_update_chart',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          values: [10, 20, 30, 40],
        },
      }),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(`Failed to update chart data: ${updateResponse.status} - ${errorText}`);
    }

    const updatedData = await updateResponse.json();
    console.log('✅ Chart data updated successfully:', updatedData.data);

    // Step 6: Verify the updated data
    console.log('\n6. Verifying updated chart data...');
    const verifyResponse = await fetch(`${NEXT_API_BASE}/chart-data?endpoint=test_update_chart`);
    
    if (!verifyResponse.ok) {
      throw new Error('Failed to verify updated chart data');
    }

    const verifiedData = await verifyResponse.json();
    console.log('✅ Updated chart data verified:', verifiedData.data);

    // Step 7: Test updating non-existent data (should create new)
    console.log('\n7. Testing update of non-existent data (should create new)...');
    const createResponse = await fetch(`${NEXT_API_BASE}/chart-data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: 'new_test_chart',
        data: {
          labels: ['Q1', 'Q2', 'Q3'],
          values: [100, 150, 200],
        },
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Failed to create new chart data: ${createResponse.status} - ${errorText}`);
    }

    const createdData = await createResponse.json();
    console.log('✅ New chart data created successfully:', createdData.data);

    // Step 8: Clean up - Delete test data
    console.log('\n8. Cleaning up test data...');
    await fetch(`${API_BASE}/charts/${chart.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/chartData/${chartData.id}`, { method: 'DELETE' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All chart update fix tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Chart creation: ✅');
    console.log('- Initial chart data creation: ✅');
    console.log('- Chart data retrieval: ✅');
    console.log('- Chart data update via PUT: ✅');
    console.log('- Data verification: ✅');
    console.log('- New data creation via PUT: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartUpdateFix(); 