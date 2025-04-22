import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface ContactData {
  name: string;
  email: string;
  message: string;
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
    const data: ContactData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    };

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Read existing messages
    const contactFile = path.join(dataDir, 'contact-messages.json');
    let messages: ContactData[] = [];
    if (fs.existsSync(contactFile)) {
      const fileContent = fs.readFileSync(contactFile, 'utf8');
      messages = JSON.parse(fileContent);
    }

    // Add new message
    messages.push(data);

    // Write back to file
    fs.writeFileSync(contactFile, JSON.stringify(messages, null, 2));

    // TODO: Send email notification to couple
    // TODO: Add proper error handling and validation
    // TODO: Replace with database storage

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error processing contact message:', err);
    return res.status(500).json({ message: 'Error processing message' });
  }
} 