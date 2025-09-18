import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../firestore.js";

export interface AuthedRequest extends Request {
  tenantId?: string;
  roles?: string[];
  uid?: string;
}

export async function verifyToken(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const hdr = req.header("Authorization") || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ error: { code: "UNAUTHENTICATED" } });
    const decoded = await adminAuth.verifyIdToken(token);
    const tenantId = (decoded as any).tenantId;
    const roles = (decoded as any).roles || [];
    if (!tenantId) return res.status(403).json({ error: { code: "FORBIDDEN", message: "No tenant" } });
    req.tenantId = tenantId;
    req.roles = roles;
    req.uid = decoded.uid;
    next();
  } catch {
    return res.status(401).json({ error: { code: "UNAUTHENTICATED" } });
  }
}

export function requireRole(...allowed: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    const roles = req.roles || [];
    if (!allowed.some(r => roles.includes(r))) {
      return res.status(403).json({ error: { code: "FORBIDDEN", message: "Role not allowed" } });
    }
    next();
  };
}
