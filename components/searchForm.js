import { useState } from 'react';
import { KIND_LABELS, MIN_AGE_TYPE_LABELS } from '../constants/labels';

export default function SearchForm({setNurseries}) {
  const [params, setParams] = useState({
    minAgeType: '',
    kinds: {},
    address: '',
    km: '0.3',
  });

  const handleChangeParams = (e) => {
    let newParams = {};
    const value = e.target.value;
    const key = e.target.name;
    switch (e.target.name) {
      case 'minAgeType':
      case 'address':
      case 'km':
        newParams = {
          ...params,
          [key]: value,
        };
        break;
      case 'kinds':
        const newKinds = {
          ...params.kinds,
          [e.target.id]: e.target.checked,
        };
        newParams = {
          ...params,
          kinds: newKinds,
        }
      default:
        break;
    }

    setParams(newParams)
  }

  const onClickSubmit = (e) => {
    const kinds = [];
    Object.entries(params.kinds).forEach(([key, value]) => {
      if (value) { kinds.push(key); } 
    });

    const reqParams = {
      minAgeType: params.minAgeType,
      address: params.address,
      km: params.km,
      kinds: kinds,
    };
    search(reqParams)
      .then(data => setNurseries(data))
      .catch((err) => {
        console.error(err);
        alert('エラーが発生しました。もう一度お試しください。');
      })
  }

  return (
      <div>
        <label className="label">保育園種別</label>
        {Object.entries(KIND_LABELS).map(([value, label]) => (
          <label className="checkbox" key={value}>
            <input type="checkbox" id={value} name="kinds" onChange={handleChangeParams} checked={params.kinds[value] ? true : false} />
            {label}
          </label>
        ))}
        <label className="label">保育開始年齢</label>
        <div className="select">
          <select name="minAgeType" onChange={handleChangeParams} value={params.minAgeType}>
            <option key="none">問わない</option>
            {Object.entries(MIN_AGE_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}〜</option>
            ))}
          </select>
        </div>
        <div className="field has-addons has-addons-centered">
          <p className="control">
            <input name="address" className="input" type="text" placeholder="住所" onChange={handleChangeParams} value={params.address} />
          </p>
          <p className="control">
            <span className="select">
              <select name="km" onChange={handleChangeParams} value={params.km}>
                <option value="0.1">100m以内</option>
                <option value="0.3">300m以内</option>
                <option value="0.5">500m以内</option>
                <option value="1.0">1km以内</option>
                <option value="1.5">1.5km以内</option>
              </select>
            </span>
          </p>
        </div>
        <div className="control">
          <button className="button is-primary" onClick={onClickSubmit}>検索</button>
        </div>
      </div>
  );
};

async function search(params = {}) {
  const url = `${process.env.BASE_API_URL}/nurseries/search.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data = await res.json();
  if (res.status != 200) {
    throw Error(data.error);
  }

  return data;
}

