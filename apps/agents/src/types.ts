export type SequenceStep = { id: string; waitMs: number; channel: "email"; templateKey: string; abKey?: string };

export type TenantSettings = {
  id: string;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  templateIds: Record<string, string>;
  sequences: Record<string, { name: string; steps: SequenceStep[] }>;
};
