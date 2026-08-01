const { appendRsvp } = require('../lib/rsvpSheets');

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === 'string') return JSON.parse(body);
  return body;
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { firstName, lastName, people, whoComing, allergies } = parseBody(req.body);

    if (!firstName || !lastName || !people) {
      res.status(400).json({ error: 'Missing required RSVP fields' });
      return;
    }

    await appendRsvp({ firstName, lastName, people, whoComing, allergies });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error submitting RSVP to Google Sheets:', error);
    res.status(500).json({ error: 'Error submitting RSVP' });
  }
};
