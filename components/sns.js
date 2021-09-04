import { useEffect } from "react";

export default function Sns() {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  });

  const renderShareBtn = () => {
    return (
      <>
        <div className="level-item">
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-size="large" data-text="江東区の近くの保育園を検索できて、定員や入園可能点数（ボーダー）もまとめて確認できる！！" data-hashtags="江東区認可保育園" data-show-count="false" rel="noreferrer">Tweet</a>
        </div>
        <div className="level-item">
          <div className="fb-share-button" data-href="https://koto-nursery.com/" data-layout="button" data-size="large">
            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkoto-nursery.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore" rel="noreferrer">シェア</a>
          </div>
          <div id="fb-root" />
        </div>
      </>
    );
  }

  return (
    <nav className="level is-mobile">
      <div className="level-left" suppressHydrationWarning={true}>
        {process.browser && renderShareBtn()}
      </div>
    </nav>
  )
}
