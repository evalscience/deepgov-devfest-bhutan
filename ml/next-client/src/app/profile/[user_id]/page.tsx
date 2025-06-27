export default async function ProfilePage({
  params,
}: {
  params: { user_id: string };
}) {
  const res = await fetch(`http://localhost:8080/profile/${params.user_id}`, {
    // You may want to add cache: "no-store" if you want fresh data every time
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Profile not found.</div>;
  }

  const data = await res.json();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow rounded p-6">
        <p>
          <strong>User ID:</strong> {data.user_id}
        </p>
        <p>
          <strong>DID:</strong> {data.did}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {data.date_of_birth}
        </p>
        <p>
          <strong>Citizenship:</strong> {data.citizenship}
        </p>
        <p>
          <strong>Address 1:</strong> {data.address1}
        </p>
        <p>
          <strong>Address 2:</strong> {data.address2}
        </p>
        <p>
          <strong>Address 3:</strong> {data.address3}
        </p>
        <p>
          <strong>Created At:</strong> {data.created_at}
        </p>
        <p>
          <strong>Updated At:</strong> {data.updated_at}
        </p>
      </div>
    </div>
  );
}
