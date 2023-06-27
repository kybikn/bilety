import './globals.css'
import { Roboto } from 'next/font/google'
import { StoreProvider } from '@/redux/StoreProvider'
import { HeadersAdapter } from 'next/dist/server/web/spec-extension/adapters/headers'
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

const roboto = Roboto({ subsets: ['latin', "cyrillic"], style: ['normal', 'italic'], display: 'swap', weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata = {
  title: 'Билетопоиск',
  description: 'Сервис для поиска и покупки билетов',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={roboto.className}>
      <body >
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
        <div id='myportal' />
        <div id='modalcontainer' />
        <div id='popupcontainer' />
      </body>
    </html>
  )
}
