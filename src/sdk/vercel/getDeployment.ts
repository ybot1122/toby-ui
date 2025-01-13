const VERCEL_API_URL = "https://api.vercel.com/v13/deployments/";

interface VercelDeployment {
  checksConclusion: "succeeded" | "failed" | "skipped" | "canceled";
  buildingAt: number;
  canceledAt: number;
  buildSkipped: boolean;
  bootedAt: number;
  aliasAssigned: boolean;
  creator: {
    avatar: string;
    uid: string;
    username: string;
  };
  id: string;
  name: string;
  meta: Record<string, unknown>;
  public: boolean;
  readyState:
    | "QUEUED"
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "READY"
    | "CANCELED";
  readySubstate?: "STAGED" | "PROMOTED";
  regions: string[];
  status:
    | "QUEUED"
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "READY"
    | "CANCELED";
  url: string;
  version: string;
}

export async function getDeployment({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<VercelDeployment> {
  const response = await fetch(`${VERCEL_API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
