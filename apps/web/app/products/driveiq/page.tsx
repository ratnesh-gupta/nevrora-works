import { notFound } from "next/navigation";

/**
 * STRICT NEGATIVE CONSTRAINT:
 * Product 'driveiq' is unpublished (published: false).
 * Any direct access to /products/driveiq MUST immediately trigger notFound() (HTTP 404).
 */
export default function DriveIQPage() {
  notFound();
}
