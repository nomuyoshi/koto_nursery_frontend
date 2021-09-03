import { useState } from 'react';
import { KIND_LABELS, MIN_AGE_TYPE_LABELS } from '../constants/labels';
import { postSearch } from '../lib/nursery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

export default function SearchForm({setNurseries}) {
  const [visible, setVisible] = useState(true);
  const [params, setParams] = useState({
    minAgeType: '',
    kinds: {},
    address: '',
    km: '0.3',
  });

  const handleClickVisible = () => {
    setVisible(!visible);
  }

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
      case 'kinds': {
        const newKinds = {
          ...params.kinds,
          [e.target.id]: e.target.checked,
        };
        newParams = {
          ...params,
          kinds: newKinds,
        }
        break;
      }
      default:
        break;
    }

    setParams(newParams);
  }

  const onClickSubmit = () => {
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

  const messageHeaderIcon = visible ? faChevronCircleUp : faChevronCircleDown;
  return (
      <article className="message">
        <div className="message-header">
          <span className="icon-text">
            <span className="icon">
              <FontAwesomeIcon icon={faSearch} size="sm" />
            </span>
            <span>検索条件を設定</span>
          </span>
          <span className="icon is-clickable" onClick={handleClickVisible}>
            <FontAwesomeIcon icon={messageHeaderIcon} size="lg" />
          </span>
        </div>
        <div className={visible ? "message-body" : "is-hidden"}>
          <div className="field">
            <label className="label">保育園種別</label>
            <div className="control">
              {Object.entries(KIND_LABELS).map(([value, label]) => (
                <label className="checkbox" style={{marginRight: '30px'}} key={value}>
                  <input type="checkbox" id={value} name="kinds" onChange={handleChangeParams} checked={params.kinds[value] ? true : false} />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="label">保育開始年齢</label>
            <div className="control">
              <div className="select">
                <select name="minAgeType" onChange={handleChangeParams} value={params.minAgeType}>
                  <option key="none">問わない</option>
                  {Object.entries(MIN_AGE_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}〜</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <label className="label">近くの保育園を探す</label>
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
          <div className="control has-text-centered">
            <button className="button is-success" onClick={onClickSubmit}>検索</button>
          </div>
        </div>
      </article>
  );
}

async function search(params = {}) {
  const res = await postSearch(params);
  const data = await res.json();

  if (res.status != 200) {
    throw Error(data.error);
  }

  return data;
}

