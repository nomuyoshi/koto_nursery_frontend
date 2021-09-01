export default function CapacityTable({ capacities }) {
  const classAges = [0, 1, 2, 3, 4, 5];
  const capacityPerClass = classAges.map((age) => {
    const capacity = capacities.find(c => c.age == age);
    const num = capacity ? capacity.num : null;
    return {
      age,
      num,
    };
  });
  return (
    <table className="table is-fullwidth">
      <thead className="has-text-centered">
        <tr>
          <th>0歳</th>
          <th>1歳</th>
          <th>2歳</th>
          <th>3歳</th>
          <th>4歳</th>
          <th>5歳</th>
        </tr>
      </thead>
      <tbody className="has-text-centered">
        <tr>
          {capacityPerClass.map((c) => (
            <td key={c.age}>{c.num ? c.num : '-'}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
