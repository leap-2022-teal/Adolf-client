import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { orgId } = router.query;

  return <div>Summary {orgId}</div>;
}
