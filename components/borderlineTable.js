const classAges = [0, 1, 2, 3, 4, 5];

export default function BorderlineTable({ borderlines }) {
  return (
    <div className="table-container">
      <table className="table is-fullwidth" style={{whiteSpace: 'nowrap'}}>
        <thead className="has-text-centered">
          <tr>
            <th></th>
            {classAges.map(age => <th>{age}歳</th>)}
          </tr>
        </thead>
        <tbody className="has-text-centered">
          {borderlines.map(b => <BorderlineTableRow key={b.id} borderline={b} /> )}
        </tbody>
      </table>
    </div>
  )
}


function BorderlineTableRow({ borderline }) {
  const borderlineByClasses = classAges.map((age) => {
    const classAgeBorderline = borderline.data.find(b => b.age == age);
    let point;
    if (!classAgeBorderline) {
      point = '-';
    } else if (classAgeBorderline.undisclosed) {
      point = '非公開';
    } else if (classAgeBorderline.lessCapacity) {
      point = 'なし';
    } else {
      point = `${classAgeBorderline.point}`;
    }

    return {
      age,
      point,
    }
  });

  return (
    <tr>
      <th>{borderline.year}年</th>
      {borderlineByClasses.map((b) => (
        <td key={b.age}>{b.point}</td>      
      ))}
    </tr>
  )
}
