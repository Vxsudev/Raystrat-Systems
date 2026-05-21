import crypto from "crypto";
import { accessTenantSecret } from "../secrets/secretManager.js";
import type { VerifyHeaders } from "../types.js";

/**
 * Pure verification primitive. No I/O.
 * publicKey: base64-encoded Ed25519 public key from SendGrid settings.
 * signature: base64-encoded Ed25519 signature from header.
 * timestamp: string value from header.
 * rawBody: exact raw bytes of the request body (Buffer or Uint8Array).
 */
export function verifyWithPublicKey(
  publicKey: string,
  signature: string,
  timestamp: string,
  rawBody: Uint8Array
): boolean {
  try {
    const verify = crypto.verify(
      null,
      Buffer.concat([Buffer.from(timestamp), rawBody]),
      crypto.createPublicKey({ key: Buffer.from(publicKey, "base64"), format: "der", type: "spki" }),
      Buffer.from(signature, "base64")
    );
    return verify;
  } catch {
    return false;
  }
}

/**
 * Verify a webhook for a specific tenant.
 * - Loads per-tenant public key: sg_evpk__TENANT_<tenantId>
 * - Enforces ±300s timestamp skew.
 * - Returns boolean only; caller handles HTTP responses/logging.
 */
export async function verifySignedEvent(
  tenantId: string,
  headers: VerifyHeaders,
  rawBody: Uint8Array,
  nowMs = Date.now()
): Promise<boolean> {
  if (!tenantId) return false;

  const { signature, timestamp } = headers;
  if (!signature || !timestamp) return false;

  // Skew check
  const skewSec = Math.abs(nowMs / 1000 - Number(timestamp));
  if (!Number.isFinite(skewSec) || skewSec > 300) return false;

  const secretName = `sg_evpk__TENANT_${tenantId}`;
  let publicKey: string;
  try {
    publicKey = await accessTenantSecret(process.env.GOOGLE_CLOUD_PROJECT || "", secretName);
  } catch {
    return false;
  }

  try {
    return verifyWithPublicKey(publicKey, signature, timestamp, rawBody);
  } catch {
    return false;
  }
}