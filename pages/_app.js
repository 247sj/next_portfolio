import Footer from '../components/footer'
import Header from '../components/header'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
export default function App({ Component, pageProps }) {
  return (
    <div className="bg-primary">
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </div>
  )
}
