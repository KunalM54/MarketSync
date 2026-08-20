import ImageKit from "imagekit";
import { AppError } from "../../utils/AppError.js";
import { env } from "../../config/env.js";
import type { UploadImageDto } from "./upload.validation.js";

let imagekit: ImageKit | null = null;

const getImageKit = () => {
  if (!imagekit) {
    imagekit = new ImageKit({
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    });
  }

  return imagekit;
};

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const parseImageData = (file: string) => {
  const dataUrlMatch = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/s.exec(file);

  if (!dataUrlMatch) {
    throw new AppError(
      400,
      "Image must be sent as a base64 data URL (data:image/...;base64,...)",
    );
  }

  const mime = dataUrlMatch[1]!.toLowerCase();
  const base64Data = dataUrlMatch[2]!;

  return { mime, base64Data, sizeBytes: Buffer.byteLength(base64Data, "base64") };
};

export const uploadProductImage = async (payload: UploadImageDto) => {
  if (
    !env.IMAGEKIT_PUBLIC_KEY ||
    !env.IMAGEKIT_PRIVATE_KEY ||
    !env.IMAGEKIT_URL_ENDPOINT
  ) {
    throw new AppError(
    500,
    "ImageKit credentials are not configured. Add IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT to your .env file.",
  );
  }

  const { mime, sizeBytes } = parseImageData(payload.file);

  if (!ALLOWED_MIME_TYPES.has(mime)) {
    throw new AppError(400, `Unsupported image type: ${mime}`);
  }

  if (sizeBytes > MAX_IMAGE_BYTES) {
    throw new AppError(400, "Image too large. Maximum allowed size is 5 MB.");
  }

  if (sizeBytes <= 0) {
    throw new AppError(400, "Image file appears to be empty");
  }

  const fileName =
    payload.fileName?.trim() ??
    `product-${Date.now()}`;

  const sanitizedFileName = fileName
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

  let uploadResult;
  try {
    uploadResult = await getImageKit().upload({
      file: payload.file, // ImageKit accepts base64 data URLs directly
      fileName: `${sanitizedFileName}.${mime.split("/")[1] ?? "jpg"}`,
      folder: "/marketsync/products",
      useUniqueFileName: true,
    });
  } catch (error: any) {
    const detail =
      error?.message?.includes("Unauthorized") || error?.response?.status === 401
        ? "ImageKit rejected the request — check your credentials."
        : "ImageKit upload failed. Please try again.";

    throw new AppError(502, detail);
  }

  return {
    url: uploadResult.url,
    fileId: uploadResult.fileId,
    filePath: uploadResult.filePath,
    width: uploadResult.width,
    height: uploadResult.height,
    size: uploadResult.size,
  };
};
