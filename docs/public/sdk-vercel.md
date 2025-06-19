## Get Deployment

Retrieve details about a specific Vercel deployment by its ID.

Parameters:

- **id**: string - deployment ID
- **token**: string - Vercel API token

Returns: `Promise<VercelDeployment>`

```ts
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
  readyState: "QUEUED" | "BUILDING" | "ERROR" | "INITIALIZING" | "READY" | "CANCELED";
  readySubstate?: "STAGED" | "PROMOTED";
  regions: string[];
  status: "QUEUED" | "BUILDING" | "ERROR" | "INITIALIZING" | "READY" | "CANCELED";
  url: string;
  version: string;
}
```

Example:

```ts
import { getDeployment } from "@ybot1122/toby-ui/Sdk/Vercel/getDeployment";

const deployment = await getDeployment({
  id: "dpl_123456789",
  token: "your-vercel-token",
});

console.log(`Deployment status: ${deployment.status}`);
console.log(`Deployment URL: ${deployment.url}`);
```

## Get Deployment Events

Retrieve events for a specific deployment. Returns a Response object which may contain a readable stream when following events.

Parameters:

- **id**: string - deployment ID
- **token**: string - Vercel API token
- **follow**: boolean (optional) - whether to follow events in real-time (default: false)
- **limit**: number (optional) - maximum number of events to return (default: -1 for all)

Returns: `Promise<Response>` - Response object (contains readable stream when follow=true)

Example:

```ts
import { getDeploymentEvents } from "@ybot1122/toby-ui/Sdk/Vercel/getDeploymentEvents";

// Get deployment events (static)
const eventsResponse = await getDeploymentEvents({
  id: "dpl_123456789",
  token: "your-vercel-token",
  limit: 50,
});

const events = await eventsResponse.json();

// Follow deployment events (streaming)
const streamResponse = await getDeploymentEvents({
  id: "dpl_123456789",
  token: "your-vercel-token",
  follow: true,
});

// Handle streaming response
const reader = streamResponse.body?.getReader();
```

## List Deployments

List deployments for a specific application with optional filtering by time range.

Parameters:

- **app**: string - application name
- **token**: string - Vercel API token
- **limit**: number - maximum number of deployments to return
- **since**: number (optional) - timestamp to filter deployments from
- **until**: number (optional) - timestamp to filter deployments until

Returns: `Promise<Response>`

```ts
interface Response {
  deployments: Deployment[];
  pagination: VercelPagination;
}

interface Deployment {
  aliasAssigned: null | number | boolean;
  aliasError: null | { code: string; message: string };
  buildingAt: number;
  checksConclusion: "succeeded" | "failed" | "skipped" | "canceled";
  checksState: "registered" | "running" | "completed";
  created: number;
  name: string;
  inspectorUrl: null | string;
  readyState: "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED" | "DELETED";
  source: "trigger-git-deploy" | "cli" | "clone/repo" | "git" | "import" | "import/repo" | "redeploy" | "v0-web";
  state: "BUILDING" | "ERROR" | "INITIALIZING" | "QUEUED" | "READY" | "CANCELED" | "DELETED";
  uid: string;
  url: string;
}

interface VercelPagination {
  count: number;
  next: null | number;
  prev: null | number;
}
```

Example:

```ts
import { listDeployments } from "@ybot1122/toby-ui/Sdk/Vercel/listDeployments";

// List recent deployments
const deploymentsList = await listDeployments({
  app: "my-app",
  token: "your-vercel-token",
  limit: 20,
});

console.log(`Found ${deploymentsList.deployments.length} deployments`);

// List deployments within a time range
const filteredDeployments = await listDeployments({
  app: "my-app",
  token: "your-vercel-token",
  limit: 10,
  since: Date.now() - 7 * 24 * 60 * 60 * 1000, // Last 7 days
  until: Date.now(),
});
```