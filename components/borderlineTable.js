const classAges = [0, 1, 2, 3, 4, 5];

export default function BorderlineTable({ borderlines }) {
  return (
    <>
      <div className="table-container mb-0">
        <table className="table is-fullwidth" style={{whiteSpace: 'nowrap'}}>
          <thead className="has-text-centered">
            <tr>
              <th></th>
              {classAges.map(age => <th key={age}>{age}歳</th>)}
            </tr>
          </thead>
          <tbody className="has-text-centered">
            {borderlines.map(b => <BorderlineTableRow key={b.year} borderline={b} /> )}
          </tbody>
        </table>
      </div>
      <p className="is-size-7">
        ※ 「-」: 募集定員なし<br />
        ※ 「非公開」: 入園者一人の場合非公開<br />
        ※ 「なし」: 全員入園<br />
      </p>
    </>
  );
}


function BorderlineTableRow({ borderline }) {
  const borderlineByClasses = classAges.map((age) => {
    const classAgeBorderline = borderline.data.find(b => b.age == age);
    let point;
    if (classAgeBorderline && classAgeBorderline.undisclosed) {
      point = '非公開';
    } else if (classAgeBorderline && classAgeBorderline.lessCapacity) {
      point = 'なし';
    } else if (classAgeBorderline && classAgeBorderline.point) {
      point = `${classAgeBorderline.point}`;
    } else {
      point = '-';
    }

    return {
      age,
      point,
    };
  });

  return (
    <tr>
      <th>{borderline.year}年</th>
      {borderlineByClasses.map(b => <td key={b.age}>{b.point}</td>)}
    </tr>
  );
}
