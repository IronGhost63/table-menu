export default async  function Page ({params}: { params: Promise<{ orderId: number }> }) {
  const { orderId } = await params;

  return (
    <div>
      {orderId}
    </div>
  )
}
