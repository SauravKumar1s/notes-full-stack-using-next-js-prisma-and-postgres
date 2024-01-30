
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export default async function ALL(
  req: NextRequest,
  res: NextResponse
) {
  console.log('Request received for /api/notes/all');

  if (req.method === 'GET') {
    try {
      const entries = await prisma.entry.findMany();
      console.log('Entries:', entries);
      
    } catch (error) {
      console.error('Error fetching entries:', error);
      
    }
  } else {

  }
}