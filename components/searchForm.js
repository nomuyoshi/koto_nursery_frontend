import { useState } from 'react';
import { KIND_LABELS, MIN_AGE_TYPE_LABELS } from '../constants/labels';

export default function SearchForm() {
  const [selectedMinAgeType, setMinAgeType] = useState();
  const [checkedKinds, setCheckedKinds] = useState({});
  const handleMinAgeTypeChange = (e) => setMinAgeType(e.target.value);
  const handleKindsChange = (e) => {
    setCheckedKinds({
      ...checkedKinds,
      [e.target.name]: e.target.checked,
    });
  };
  return (
      <div>
        <label className="label">保育園種別</label>
        {Object.entries(KIND_LABELS).map(([value, label]) => (
          <label className="checkbox" key={value}>
            <input type="checkbox" name={value} onChange={handleKindsChange} checked={checkedKinds[value] ? true : false}/>
            {label}
          </label>
        ))}
        <label className="label">保育開始年齢</label>
        <div className="select">
          <select value={selectedMinAgeType} onChange={handleMinAgeTypeChange}>
            <option key="none">問わない</option>
            {Object.entries(MIN_AGE_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}〜</option>
            ))}
          </select>
        </div>
        <div className="control">
          <button className="button is-primary">検索</button>
        </div>
      </div>
  );
};
