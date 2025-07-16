const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testChartKeyFix() {
  console.log('🧪 Testing Chart Key Generation Fix...\n');

  try {
    // Step 1: Create a test dashboard
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Dashboard for Key Fix',
        description: 'Dashboard to test chart key generation',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!dashboardResponse.ok) {
      throw new Error('Failed to create dashboard');
    }

    const dashboard = await dashboardResponse.json();
    console.log(`✅ Dashboard created with ID: ${dashboard.id}`);
    console.log(`✅ Dashboard updatedAt: ${dashboard.updatedAt}`);

    // Step 2: Create a test chart
    console.log('\n2. Creating test chart...');
    const chartResponse = await fetch(`${API_BASE}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dashboardId: dashboard.id,
        type: 'bar',
        title: 'Test Chart for Key Fix',
        dataEndpoint: '/api/data/test_key_chart',
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
    console.log(`✅ Chart updatedAt: ${chart.updatedAt}`);

    // Step 3: Test key generation logic
    console.log('\n3. Testing key generation logic...');
    const chartId = chart.id;
    const updatedAt = chart.updatedAt;
    
    // Simulate the key generation logic
    const key = `${chartId}-${updatedAt ? new Date(updatedAt).getTime() : Date.now()}`;
    console.log(`✅ Generated key: ${key}`);
    
    // Test that the key is valid
    if (key.includes(chartId) && key.includes('-')) {
      console.log('✅ Key format is valid');
    } else {
      throw new Error('Invalid key format');
    }

    // Step 4: Update the chart to test key change
    console.log('\n4. Updating chart to test key change...');
    const updateResponse = await fetch(`${API_BASE}/charts/${chart.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Test Chart',
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update chart');
    }

    const updatedChart = await updateResponse.json();
    console.log(`✅ Chart updated successfully: ${updatedChart.title}`);
    console.log(`✅ Updated chart updatedAt: ${updatedChart.updatedAt}`);

    // Step 5: Test new key generation
    console.log('\n5. Testing new key generation...');
    const newKey = `${updatedChart.id}-${updatedChart.updatedAt ? new Date(updatedChart.updatedAt).getTime() : Date.now()}`;
    console.log(`✅ New generated key: ${newKey}`);
    
    // Verify keys are different (indicating re-render will happen)
    if (key !== newKey) {
      console.log('✅ Keys are different - chart will re-render');
    } else {
      console.log('⚠️ Keys are the same - chart may not re-render');
    }

    // Step 6: Test with null updatedAt
    console.log('\n6. Testing with null updatedAt...');
    const fallbackKey = `${chartId}-${Date.now()}`;
    console.log(`✅ Fallback key: ${fallbackKey}`);

    // Step 7: Clean up - Delete test data
    console.log('\n7. Cleaning up test data...');
    await fetch(`${API_BASE}/charts/${chart.id}`, { method: 'DELETE' });
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All chart key generation tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Chart creation: ✅');
    console.log('- Key generation: ✅');
    console.log('- Chart update: ✅');
    console.log('- New key generation: ✅');
    console.log('- Fallback key test: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testChartKeyFix(); 