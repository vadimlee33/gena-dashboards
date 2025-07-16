const API_BASE = 'http://localhost:3001';

async function testChartDataCreation() {
  console.log('Testing chart data creation...\n');

  try {
    // Test 1: Create chart data for number chart
    console.log('1. Creating number chart data...');
    const numberChartData = {
      endpoint: 'test_number_chart',
      data: {
        value: 12345,
        label: 'Test Number',
        unit: 'USD'
      }
    };

    const numberResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(numberChartData)
    });

    if (numberResponse.ok) {
      const numberResult = await numberResponse.json();
      console.log('✅ Number chart data created:', numberResult.id);
    } else {
      console.log('❌ Failed to create number chart data');
    }

    // Test 2: Create chart data for bar chart
    console.log('\n2. Creating bar chart data...');
    const barChartData = {
      endpoint: 'test_bar_chart',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        values: [10, 20, 15, 25]
      }
    };

    const barResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(barChartData)
    });

    if (barResponse.ok) {
      const barResult = await barResponse.json();
      console.log('✅ Bar chart data created:', barResult.id);
    } else {
      console.log('❌ Failed to create bar chart data');
    }

    // Test 3: Create chart data for line chart
    console.log('\n3. Creating line chart data...');
    const lineChartData = {
      endpoint: 'test_line_chart',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        values: [5, 10, 8, 15, 12]
      }
    };

    const lineResponse = await fetch(`${API_BASE}/chartData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lineChartData)
    });

    if (lineResponse.ok) {
      const lineResult = await lineResponse.json();
      console.log('✅ Line chart data created:', lineResult.id);
    } else {
      console.log('❌ Failed to create line chart data');
    }

    // Test 4: Get all chart data
    console.log('\n4. Getting all chart data...');
    const getAllResponse = await fetch(`${API_BASE}/chartData`);
    if (getAllResponse.ok) {
      const allData = await getAllResponse.json();
      console.log(`Found ${allData.length} chart data entries`);
      console.log('Endpoints:', allData.map(d => d.endpoint));
    }

    console.log('\n🎉 Chart data creation test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testChartDataCreation(); 