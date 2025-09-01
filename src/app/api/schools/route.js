import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { uploadToCloudinary } from '../../../lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const image = formData.get('image');

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Handle image upload if provided
    if (image && image.size > 0) {
      try {
        // Convert file to buffer for Cloudinary
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = `data:${image.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(base64String, 'nextschool/schools');
        
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        } else {
          console.error('Failed to upload image to Cloudinary:', uploadResult.error);
          return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
          );
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to process image' },
          { status: 500 }
        );
      }
    }

    // Insert into database
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return NextResponse.json(
      { 
        message: 'School added successfully', 
        id: result.insertId,
        imageUrl: imageUrl
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
    );

    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
