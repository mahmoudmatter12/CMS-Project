import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
};

cloudinary.config(cloudinaryConfig);

export async function POST(request: Request) {
  // Verify configuration is loaded
  if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error('Cloudinary configuration error:', cloudinaryConfig);
    return NextResponse.json(
      { error: 'Cloudinary configuration error' },
      { status: 500 }
    );
  }

  const { image } = await request.json();

  if (!image) {
    return NextResponse.json(
      { error: 'Image is required' },
      { status: 400 }
    );
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'onboarding-avatars',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}