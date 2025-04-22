import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface RSVPData {
  guestName: string;
  attendance: 'yes' | 'no';
  mealPreference: string;
  dietaryRestrictions: string;
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data: RSVPData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Read existing RSVPs
    const rsvpFile = path.join(dataDir, 'rsvps.json');
    let rsvps: RSVPData[] = [];
    if (fs.existsSync(rsvpFile)) {
      const fileContent = fs.readFileSync(rsvpFile, 'utf8');
      rsvps = JSON.parse(fileContent);
    }

    // Add new RSVP
    rsvps.push(data);

    // Write back to file
    fs.writeFileSync(rsvpFile, JSON.stringify(rsvps, null, 2));

    // TODO: Send email notification to couple
    // TODO: Add proper error handling and validation
    // TODO: Replace with database storage

    return res.status(200).json({ message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return res.status(500).json({ message: 'Error processing RSVP' });
  }
} 