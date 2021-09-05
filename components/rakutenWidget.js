import Script from 'next/script';
import { useEffect } from "react";

export default function RakutenWidget() {
  useEffect(() => {
    window.rakuten_affiliateId="0ea62065.34400275.0ea62066.204f04c0";
    window.rakuten_items="ranking";
    window.rakuten_genreId="100533";
    window.rakuten_recommend="on";
    window.rakuten_design="slide";
    window.rakuten_size="300x250";
    window.rakuten_target="_blank";
    window.rakuten_border="on";
    window.rakuten_auto_mode="on";
    window.rakuten_adNetworkId="a8Net";
    window.rakuten_adNetworkUrl="https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D2BPNO0%2B6YNLJM%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";
    window.rakuten_pointbackId="a14060530502_2BPNO0_6YNLJM_2HOM_BS629";
    window.rakuten_mediaId="20011813";
  });

  return (
    <div>
      <Script src="//xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js" />
      <img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=2BPNO0+6YNLJM+2HOM+BS629" alt=""></img>
    </div>
  )
}
