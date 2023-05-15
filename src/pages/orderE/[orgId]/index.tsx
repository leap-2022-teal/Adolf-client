import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { orgId } = router.query;

  return (
    <div>
      Index, {orgId}
      <Link href={`/order/${orgId}/calendar`}>NEXT</Link>
    </div>
  );
}
