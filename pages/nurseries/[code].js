import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/layout';
import EmbedMap from '../../components/embedMap';
import CapacityTable from '../../components/capacityTable';
import BorderlineTable from '../../components/borderlineTable';
import { postSearch, getNursery } from '../../lib/nursery';
import { getCapacities } from '../../lib/capacity';
import { getBorderlines } from '../../lib/borderline';
import { KIND_LABELS, MIN_AGE_TYPE_LABELS, OPENING_TYPE_LABELS, OVERTIME_CONDITION_TYPE_LABELS } from '../../constants/labels';

export default function Nursery({ nursery, capacities, borderlines }) {
  let overtimeNoticeText = '';
  if (nursery.overtimeConditionType) {
    overtimeNoticeText += `※ 延長保育は${OVERTIME_CONDITION_TYPE_LABELS[nursery.overtimeConditionType]}`;
  }
  return (
    <Layout>
      <div className="p-5">
        <h2 className="title is-4">
          {nursery.name}
          <span className="is-size-6 has-text-weight-normal">
            {' '}
            [
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            <a href={nursery.url} target="_blank">公式HP</a>
            ]
          </span>
        </h2>
        <table className="table is-fullwidth">
          <tbody>
            <tr>
              <td>種別</td>
              <td>{KIND_LABELS[nursery.kind]}</td>
            </tr>
            <tr>
              <td>住所</td>
              <td>{nursery.address}</td>
            </tr>
            <tr>
              <td>電話番号</td>
              <td><a href={`tel:${nursery.phoneNumber}`}>{nursery.phoneNumber}</a></td>
            </tr>
            <tr>
              <td>入園可能年齢</td>
              <td>{MIN_AGE_TYPE_LABELS[nursery.minAgeType]} 〜</td>
            </tr>
            <tr>
              <td>開所時間</td>
              <td>
                {OPENING_TYPE_LABELS[nursery.openingType]}<br />
                {overtimeNoticeText}
              </td>
            </tr>
            <tr>
              <td>延長保育</td>
              <td>{MIN_AGE_TYPE_LABELS[nursery.minAgeType]} 〜</td>
            </tr>
          </tbody>
        </table>
        <EmbedMap address={nursery.address} />
      </div>
      <div className="p-5">
        <h3 className="title is-5">入園可能ボーダー</h3>
        <BorderlineTable borderlines={borderlines} />
      </div>
      <div className="p-5">
        <h3 className="title is-5">定員</h3>
        <CapacityTable capacities={capacities} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await postSearch();
  const nurseries = await res.json();
  const paths = nurseries.map((nursery) => {
    return {
      params: {
        code: nursery.code.toString()
      }
    };
  });

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const nurseryRes = await getNursery(params.code);
  const nursery = await nurseryRes.json();

  const capacitiesRes = await getCapacities(params.code);
  const capacities = await capacitiesRes.json();

  const borderlinesRes = await getBorderlines(params.code);
  const borderlines = await borderlinesRes.json();

  return {
    props: {
      nursery,
      capacities,
      borderlines,
    }
  };
}
