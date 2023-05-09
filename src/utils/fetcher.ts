export async function fetcher(path: string) {
  const req = await fetch(`${process.env.REACT_APP_API_URL}/${path}`);
  const data = await req.json();
  return data;
}
