const url = "https://api.brevo.com/v3/contacts";

export const createContact = async ({
  updateEnabled,
  email,
  listIds,
  attributes,
  brevoApiKey,
}: {
  updateEnabled: boolean;
  email: string;
  listIds: number[];
  attributes: Record<string, string>;
  brevoApiKey: string;
}): Promise<"created" | "updated" | "failed"> => {
  const data = {
    updateEnabled,
    email,
    listIds,
    attributes,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify(data),
  });

  if (response.status === 201) {
    return "created";
  }

  if (response.status === 204) {
    return "updated";
  }
  return "failed";
};
