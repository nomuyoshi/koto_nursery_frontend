import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Meta({pageTitle, description}) {
  const router = useRouter();
  const currentPath = router.asPath;
  const baseUrl = process.env.SITE_BASE_URL;
  const url = currentPath ? `${baseUrl}${currentPath}` : baseUrl;
  const siteTitle = 'KOTOほいくえん';
  const title = `${pageTitle} | ${siteTitle}`;

  return (
    <Head>
      <title>{pageTitle} | {siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:image" content={`${baseUrl}/ogp.png`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v11.0" nonce="A57BSQs1"></script>
    </Head>
  )
}
