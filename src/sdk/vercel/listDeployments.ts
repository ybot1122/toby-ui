const VERCEL_API_URL = "https://api.vercel.com/v6/deployments?";

interface Deployment {
  aliasAssigned: null | number | boolean;
  aliasError: null | { code: string; message: string };
  buildingAt: number;
  checksConclusion: "succeeded" | "failed" | "skipped" | "canceled";
  checksState: "registered" | "running" | "completed";
  created: number;
  name: string;
  inspectorUrl: null | string;
  readyState:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED"
    | "DELETED";
  source:
    | "trigger-git-deploy"
    | "cli"
    | "clone/repo"
    | "git"
    | "import"
    | "import/repo"
    | "redeploy"
    | "v0-web";
  state:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED"
    | "DELETED";
  uid: string;
  url: string;
}

interface Response {
  deployments: Deployment[];
  pagination: VercelPagination;
}

interface VercelPagination {
  count: number;
  next: null | number;
  prev: null | number;
}

export async function listDeployments({
  app,
  since: sinceProp,
  until: untilProp,
  limit,
  token,
}: {
  app: string;
  since?: number;
  until?: number;
  limit: number;
  token: string;
}): Promise<Response> {
  const since = sinceProp ? `&since=${sinceProp}` : "";
  const until = untilProp ? `&until=${untilProp}` : "";
  const response = await fetch(
    `${VERCEL_API_URL}app=${app}${since}${until}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
