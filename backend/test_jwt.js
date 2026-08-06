require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey123';
// Generate token for Likhitha (likhink11@gmail.com, ID: 6a7384a7aafcd47f430bfbb8)
const token = jwt.sign({ user: { id: '6a7384a7aafcd47f430bfbb8' } }, JWT_SECRET, { expiresIn: '5 days' });

console.log('Generated token:', token);

async function testFetch() {
  try {
    const response = await fetch('http://localhost:5000/api/decks/all', {
      headers: { 'x-auth-token': token }
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Decks returned:', data.map(d => ({ title: d.title, isPublic: d.isPublic, user: d.user })));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
testFetch();
