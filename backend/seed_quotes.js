const fetch = require('node-fetch');

async function seed() {
  const url = 'http://localhost:3000/api/v1/quotes';
  const headers = { 'Content-Type': 'application/json', 'x-tenant-id': 'default-tenant-hub' };

  const samples = [
    { clientName: 'Skyline Ventures', eventType: 'corporate', eventDate: '2026-09-15', expectedGuests: '300' },
    { clientName: 'Prism Logistics', eventType: 'conference', eventDate: '2026-10-20', expectedGuests: '500' },
    { clientName: 'NexGen Media', eventType: 'gala', eventDate: '2026-11-05', expectedGuests: '150' },
  ];

  console.log('Seeding sample quotes...');
  for (const s of samples) {
    try {
      const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(s) });
      const data = await res.json();
      console.log(`Created Quote: ${data.id || data.quoteId} for ${s.clientName}`);
      
      const qid = data.id || data.quoteId;
      if (qid) {
         const syncRes = await fetch(`${url}/${qid}/sync-items`, {
           method: 'POST', headers,
           body: JSON.stringify({
             items: [
               { categoryName: 'Venue Selection', description: 'Grand Ballroom', qty: 1, price: 10000, discount: 0 },
               { categoryName: 'Gourmet Catering', description: 'Premium Dinner Package', qty: parseInt(s.expectedGuests), price: 150, discount: 5 }
             ]
           })
         });
         await syncRes.json();
         console.log(`  Added items to ${qid}`);
      }
    } catch (e) {
      console.error(`Failed to create quote for ${s.clientName}:`, e.message);
    }
  }
}

seed();
