// Simple API test script
const API_BASE = 'http://localhost:3001';

async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // Test 1: Get dashboards
    console.log('1. Testing GET /dashboards');
    const dashboardsResponse = await fetch(`${API_BASE}/dashboards`);
    const dashboards = await dashboardsResponse.json();
    console.log(`Found ${dashboards.length} dashboards`);
    console.log('Dashboard IDs:', dashboards.map(d => d.id));
    console.log('');

    // Test 2: Get charts for first dashboard
    if (dashboards.length > 0) {
      const firstDashboard = dashboards[0];
      console.log(`2. Testing GET /charts?dashboardId=${firstDashboard.id}`);
      const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${firstDashboard.id}`);
      const charts = await chartsResponse.json();
      console.log(`Found ${charts.length} charts for dashboard ${firstDashboard.id}`);
      console.log('Chart titles:', charts.map(c => c.title));
      console.log('');

      // Test 3: Create a new chart
      console.log('3. Testing POST /charts');
      const newChart = {
        dashboardId: firstDashboard.id,
        type: 'bar',
        title: 'Test Chart from API',
        description: 'Test chart created via API',
        dataEndpoint: '/api/data/sample',
        order: charts.length,
        config: {
          colors: ['#3B82F6'],
          showLegend: true,
          animate: true
        }
      };

      const createResponse = await fetch(`${API_BASE}/charts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChart),
      });

      if (createResponse.ok) {
        const createdChart = await createResponse.json();
        console.log('✅ Chart created successfully:', createdChart.id);
        console.log('Chart title:', createdChart.title);
        console.log('');

        // Test 4: Update chart order
        console.log('4. Testing PATCH /charts/:id');
        const updateResponse = await fetch(`${API_BASE}/charts/${createdChart.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: 0 }),
        });

        if (updateResponse.ok) {
          const updatedChart = await updateResponse.json();
          console.log('✅ Chart order updated successfully');
          console.log('New order:', updatedChart.order);
          console.log('');

          // Test 5: Delete the test chart
          console.log('5. Testing DELETE /charts/:id');
          const deleteResponse = await fetch(`${API_BASE}/charts/${createdChart.id}`, {
            method: 'DELETE',
          });

          if (deleteResponse.ok) {
            console.log('✅ Chart deleted successfully');
          } else {
            console.log('❌ Failed to delete chart');
          }
        } else {
          console.log('❌ Failed to update chart order');
        }
      } else {
        console.log('❌ Failed to create chart');
      }
    }
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

testAPI(); 