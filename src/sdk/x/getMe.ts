export async function getMe({
  accessToken,
}: {
  accessToken: string;
}): Promise<{ name: string }> {
  const xReq = await fetch(`https://api.x.com/2/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (xReq.status === 429) {
    return {
      name: "Rate Limited :)",
    };
  }
  const x = await xReq.json();

  return {
    name: x.data.name,
  };
}
