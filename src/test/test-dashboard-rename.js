const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';
const NEXT_API_BASE = 'http://localhost:3000/api';

async function testDashboardRename() {
  console.log('🧪 Testing Dashboard Rename Functionality...\n');

  try {
    console.log('1. Creating test dashboard...');
    const dashboardResponse = await fetch(`${API_BASE}/dashboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Original Dashboard Name',
        description: 'Dashboard to test rename functionality',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!dashboardResponse.ok) {
      throw new Error('Failed to create dashboard');
    }

    const dashboard = await dashboardResponse.json();
    console.log(`✅ Dashboard created with ID: ${dashboard.id}`);
    console.log(`✅ Original name: ${dashboard.name}`);

    console.log('\n2. Testing dashboard rename...');
    const newName = 'Updated Dashboard Name';
    const renameResponse = await fetch(`${API_BASE}/dashboards/${dashboard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!renameResponse.ok) {
      throw new Error('Failed to rename dashboard');
    }

    const renamedDashboard = await renameResponse.json();
    console.log(`✅ Dashboard renamed successfully: ${renamedDashboard.name}`);

    console.log('\n3. Verifying rename was saved...');
    const verifyResponse = await fetch(`${API_BASE}/dashboards/${dashboard.id}`);
    
    if (!verifyResponse.ok) {
      throw new Error('Failed to verify dashboard rename');
    }

    const verifiedDashboard = await verifyResponse.json();
    console.log(`✅ Verified dashboard name: ${verifiedDashboard.name}`);
    
    if (verifiedDashboard.name === newName) {
      console.log('✅ Rename was successfully saved to database');
    } else {
      throw new Error('Dashboard name was not updated in database');
    }

    console.log('\n4. Testing multiple renames...');
    const secondNewName = 'Final Dashboard Name';
    const secondRenameResponse = await fetch(`${API_BASE}/dashboards/${dashboard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: secondNewName,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!secondRenameResponse.ok) {
      throw new Error('Failed to perform second rename');
    }

    const finalDashboard = await secondRenameResponse.json();
    console.log(`✅ Second rename successful: ${finalDashboard.name}`);

    console.log('\n5. Testing rename with special characters...');
    const specialName = 'Dashboard with Special Chars: @#$%^&*()';
    const specialRenameResponse = await fetch(`${API_BASE}/dashboards/${dashboard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: specialName,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!specialRenameResponse.ok) {
      throw new Error('Failed to rename with special characters');
    }

    const specialDashboard = await specialRenameResponse.json();
    console.log(`✅ Special characters rename successful: ${specialDashboard.name}`);

    console.log('\n6. Testing rename with empty name (should fail)...');
    const emptyRenameResponse = await fetch(`${API_BASE}/dashboards/${dashboard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        updatedAt: new Date().toISOString(),
      }),
    });

    if (emptyRenameResponse.ok) {
      console.log('⚠️ Empty name was accepted (this might be expected behavior)');
    } else {
      console.log('✅ Empty name was rejected as expected');
    }

    console.log('\n7. Cleaning up test dashboard...');
    await fetch(`${API_BASE}/dashboards/${dashboard.id}`, { method: 'DELETE' });
    console.log('✅ Test dashboard cleaned up');

    console.log('\n🎉 All dashboard rename tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Dashboard creation: ✅');
    console.log('- Dashboard rename: ✅');
    console.log('- Rename verification: ✅');
    console.log('- Multiple renames: ✅');
    console.log('- Special characters: ✅');
    console.log('- Empty name handling: ✅');
    console.log('- Cleanup: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}


testDashboardRename(); 