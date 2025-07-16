const API_BASE = 'http://localhost:3001';

async function testChartCreation() {
  console.log('Testing chart creation and loading...\n');

  try {
    console.log('1. Getting dashboards...');
    const dashboardsResponse = await fetch(`${API_BASE}/dashboards`);
    const dashboards = await dashboardsResponse.json();
    console.log(`Found ${dashboards.length} dashboards`);
    
    if (dashboards.length === 0) {
      console.log('No dashboards found. Creating a test dashboard...');
      
      // Create a test dashboard
      const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Dashboard',
          description: 'Dashboard for testing chart creation'
        })
      });
      
      const newDashboard = await dashboardResponse.json();
      console.log('✅ Created dashboard:', newDashboard.id);
      
      console.log('\n2. Creating a test chart...');
      const chartResponse = await fetch(`${API_BASE}/charts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dashboardId: newDashboard.id,
          type: 'bar',
          title: 'Test Chart',
          description: 'Test chart for verification',
          dataEndpoint: '/api/data/sample',
          order: 0,
          config: {
            colors: ['#3B82F6'],
            showLegend: true,
            animate: true
          }
        })
      });
      
      const newChart = await chartResponse.json();
      console.log('✅ Created chart:', newChart.id);
      console.log('Chart title:', newChart.title);
      console.log('Dashboard ID:', newChart.dashboardId);
      
      console.log('\n3. Getting charts for dashboard...');
      const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${newDashboard.id}`);
      const charts = await chartsResponse.json();
      console.log(`Found ${charts.length} charts for dashboard ${newDashboard.id}`);
      
      if (charts.length > 0) {
        console.log('Chart titles:', charts.map(c => c.title));
        console.log('Chart IDs:', charts.map(c => c.id));
      }
      
      console.log('\n4. Getting dashboard with charts...');
      const dashboardWithChartsResponse = await fetch(`${API_BASE}/dashboards/${newDashboard.id}`);
      const dashboardWithCharts = await dashboardWithChartsResponse.json();
      console.log('Dashboard:', dashboardWithCharts.name);
      console.log('Dashboard ID:', dashboardWithCharts.id);
      
      // Get charts separately
      const chartsForDashboard = await fetch(`${API_BASE}/charts?dashboardId=${newDashboard.id}`);
      const chartsData = await chartsForDashboard.json();
      console.log(`Dashboard has ${chartsData.length} charts`);
      
    } else {
      // Use existing dashboard
      const firstDashboard = dashboards[0];
      console.log('Using existing dashboard:', firstDashboard.name);
      
      console.log('\n2. Creating a test chart...');
      const chartResponse = await fetch(`${API_BASE}/charts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dashboardId: firstDashboard.id,
          type: 'line',
          title: 'New Test Chart',
          description: 'Another test chart',
          dataEndpoint: '/api/data/orders_over_time',
          order: 999,
          config: {
            colors: ['#10B981'],
            showLegend: true,
            animate: true
          }
        })
      });
      
      const newChart = await chartResponse.json();
      console.log('✅ Created chart:', newChart.id);
      console.log('Chart title:', newChart.title);
      
      console.log('\n3. Getting charts for dashboard...');
      const chartsResponse = await fetch(`${API_BASE}/charts?dashboardId=${firstDashboard.id}`);
      const charts = await chartsResponse.json();
      console.log(`Found ${charts.length} charts for dashboard ${firstDashboard.id}`);
      console.log('Chart titles:', charts.map(c => c.title));
    }
    
    console.log('\n🎉 Chart creation test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testChartCreation(); 