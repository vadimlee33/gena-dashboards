const API_BASE = 'http://localhost:3001';

async function testNewChartCreation() {
  console.log('Testing new chart creation with custom data...\n');

  try {
    // Test 1: Create chart data first
    console.log('1. Creating chart data...');
    const chartData = {
      endpoint: 'my_custom_chart',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [100, 150, 200, 175]
      }
    };

    const dataResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chartData)
    });

    if (dataResponse.ok) {
      const dataResult = await dataResponse.json();
      console.log('✅ Chart data created:', dataResult.id);
    } else {
      console.log('❌ Failed to create chart data');
      return;
    }

    // Test 2: Create chart
    console.log('\n2. Creating chart...');
    const chart = {
      dashboardId: 'dashboard-1',
      type: 'bar',
      title: 'My Custom Chart',
      description: 'A test chart with custom data',
      dataEndpoint: '/api/data/my_custom_chart',
      order: 999,
      config: {
        colors: ['#3B82F6'],
        showLegend: true,
        animate: true
      }
    };

    const chartResponse = await fetch(`${API_BASE}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chart)
    });

    if (chartResponse.ok) {
      const chartResult = await chartResponse.json();
      console.log('✅ Chart created:', chartResult.id);
      console.log('Chart title:', chartResult.title);
      console.log('Data endpoint:', chartResult.dataEndpoint);
    } else {
      console.log('❌ Failed to create chart');
      return;
    }

    // Test 3: Verify chart data is accessible
    console.log('\n3. Verifying chart data accessibility...');
    const verifyResponse = await fetch(`${API_BASE}/chartData?endpoint=my_custom_chart`);
    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json();
      console.log('✅ Chart data is accessible:', verifyData.length > 0 ? 'Data found' : 'No data');
      if (verifyData.length > 0) {
        console.log('Data structure:', {
          labels: verifyData[0].data.labels,
          values: verifyData[0].data.values
        });
      }
    } else {
      console.log('❌ Chart data not accessible');
    }

    console.log('\n🎉 New chart creation test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testNewChartCreation(); 