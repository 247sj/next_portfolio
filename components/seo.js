import Head from 'next/head'
export default function Seo({ title }) {
  return (
    <div>
      <Head>
        <title>{title} | LSJ PortFolio</title>
        <meta name="description" content="LSJ 포트폴리오" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
