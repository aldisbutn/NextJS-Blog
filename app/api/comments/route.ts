import executeQuery from '@/services/mysqlDB/db';
import { NextResponse, NextRequest } from 'next/server';

// Get all comments
export const GET = async () => {
  const comments = await executeQuery({
    query: 'SELECT * FROM Comments',
    values: [],
  });
  return NextResponse.json(comments);
};

// Post new comment
export const POST = async (req: NextRequest) => {
  try {
    const { postID, author, content, createdAt } = await req.json();
    await executeQuery({
      query: `INSERT INTO Comments (postID, author, content, createdAt)
      VALUES (?, ?, ?, ?);`,
      values: [postID, author, content, createdAt],
    });
    return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
