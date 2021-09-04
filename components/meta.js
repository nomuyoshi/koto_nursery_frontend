import Head from 'next/head';

export default function Meta({title, description}) {
  return (
    <Head>
      <title>{title} | KOTOほいくえん</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  )
}
