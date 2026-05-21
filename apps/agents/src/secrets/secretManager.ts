import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const secretCache = new Map<string, { value: string; expires: number }>();

/**
 * Accesses a secret from Google Secret Manager with a 5-minute in-memory cache.
 * @param projectId The Google Cloud project ID.
 * @param name The name of the secret.
 * @returns The secret value as a string.
 */
export async function accessTenantSecret(projectId: string, name: string): Promise<string> {
  const now = Date.now();
  const cached = secretCache.get(name);

  if (cached && now < cached.expires) {
    return cached.value;
  }

  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${name}/versions/latest`,
  });
  
  const payloadData = version.payload?.data;
  const secretValue = payloadData ? Buffer.from(payloadData).toString('utf8') : "";
  
  if (secretValue) {
    secretCache.set(name, {
      value: secretValue,
      expires: now + CACHE_TTL_MS,
    });
  }

  return secretValue;
}
