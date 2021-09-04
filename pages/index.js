import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCheckCircle, faBaby, faClock } from '@fortawesome/free-solid-svg-icons';
import { KIND_LABELS, MIN_AGE_TYPE_LABELS, OPENING_TYPE_LABELS } from '../constants/labels';
import { postSearch } from '../lib/nursery';
import Layout from '../components/layout';
import Meta from '../components/meta';
import SearchForm from '../components/searchForm';

export default function Home({initialNurseries}) {
  const [nurseries, setNurseries] = useState(initialNurseries);
  const title = '江東区認可保育園一覧'
  const description = '江東区認可保育園一覧サイト。住所から近くの認可保育園を検索でき、定員や過去の入園可能点数（ボーダー）もまとめて確認できます。';
  return (
    <Layout>
      <Meta title={title} description={description} />
      <div className="content m-4">
        <div className="notification is-success is-light is-size-7">
          江東区が発行する「保育園等入園のしおり」、「保育園入所指数ボーダー表」をもとに作成した認可保育園検索サービスです。
        </div>
      </div>

      <div className="content m-4">
        <SearchForm setNurseries={setNurseries} />
      </div>

      <div className="content m-4">
        <hr />
        <h2 className="title is-5">江東区認可保育園一覧</h2>
        <hr />
        {nurseries.map((nursery) => (
          <div key={nursery.code}>
            <div className="block">
              <Link href={`/nurseries/${nursery.code}`}>
                <a style={{color:'#4a4a4a'}}>
                  <div>
                    <p>
                      <span className="tag is-success mr-2">{KIND_LABELS[nursery.kind]}</span>
                      <span className="has-text-weight-bold">{nursery.name}</span>
                    </p>
                    <p>
                      <span className="icon-text">
                        <span className="icon">
                          <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                        </span>
                        <span>{nursery.address}</span>
                      </span>
                    </p>
                    <p>
                      <span className="icon-text">
                        <span className="icon"><FontAwesomeIcon icon={faCheckCircle} size="lg" /></span>
                        <span>入園可能年齢：{MIN_AGE_TYPE_LABELS[nursery.minAgeType]} 〜</span>
                      </span>
                    </p>
                    <p className="is-hidden-mobile">
                      <span className="icon-text">
                        <span className="icon"><FontAwesomeIcon icon={faClock} size="lg" /></span>
                        <span>開所時間：{OPENING_TYPE_LABELS[nursery.openingType]}</span>
                      </span>
                    </p>
                    <p>
                      <span className="icon-text">
                        <span className="icon"><FontAwesomeIcon icon={faBaby} size="lg" /></span>
                        <span>定員：{nursery.capacity}人</span>
                      </span>
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await postSearch();
  const data = await res.json();
  if (res.status != 200) {
    throw Error(data.error);
  }

  return {
    props: {
      initialNurseries: data,
    }
  };
}
