import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const { orgId } = router.query;

  return (
    <div>
      Calendar {orgId}
      <Link href={`/order/${orgId}`}>Prev</Link>
    </div>
  );
}
