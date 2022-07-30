import Layout from "@components/layout";

function FallbackComponent() {
  return (
    <Layout title="Loading">
      <div className="mx-3 flex flex-col space-y-3 divide-y-2 text-center">
        <div className="flex flex-row items-center justify-between space-x-2 divide-x-2 text-xl font-bold">
          <div className="w-20 bg-gray-400" />
          <div className="flex-1 bg-gray-400 text-center" />
          <div className="w-24 bg-gray-400" />
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dummy, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center justify-between space-x-2 divide-x-2 pt-2"
          >
            <div className="w-20 bg-gray-400" />
            <div className="flex-1 bg-gray-400" />
            <div className="w-24 bg-gray-400" />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default FallbackComponent;
