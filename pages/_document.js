import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='preload'  href='/public/fonts/IBMPlexSans-Bold.ttf' as='font' crossOrigin='anonymous'></link>
        <link rel='preload'  href='/public/fonts/IBMPlexSans-Regular.ttf' as='font' crossOrigin='anonymous'></link>
        <link rel='preload'  href='/public/fonts/IBMPlexSans-SemiBold.ttf' as='font' crossOrigin='anonymous'></link>      
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
