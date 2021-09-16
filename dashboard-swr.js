import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch(
    "https://task-devel.cleevio-vercel.vercel.app/api/country"
  );
  const data = await response.json();
  return data;
};
function DashbardSWR() {
  const { data, error } = useSWR("dashboard", fetcher);
  if (error) return "An error has occured";
  if (!data) return "Loading";
  return (
    <div>
      {
        data.map(function (d, idx) {
        return <li key={idx}>Country : {d.label}</li>;
      })}
      
    </div>
  );
}
export default DashbardSWR;
