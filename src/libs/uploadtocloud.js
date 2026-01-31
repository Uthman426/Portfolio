export async function uploadToCloudinary(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !preset) {
    throw new Error("Missing Cloudinary env vars. Check .env.local and restart dev server.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Cloudinary usually returns { error: { message: "..." } }
    const msg = data?.error?.message || data?.message || "Unknown Cloudinary error";
    throw new Error(`Cloudinary upload failed: ${msg}`);
  }

  return data.secure_url;
}
