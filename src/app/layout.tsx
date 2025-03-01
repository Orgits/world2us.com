import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import '@/styles/styles.scss';
import GlobalProvider from './GlobalProvider';
import ModalCart from '../components/Modal/ModalCart';
import ModalWishlist from '../components/Modal/ModalWishlist';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalQuickview from '../components/Modal/ModalQuickview';
import ModalCompare from '../components/Modal/ModalCompare';
import CountdownTimeType from '../type/CountdownType';
import { countdownTime } from '../store/countdownTime';

const instrument = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anvogue',
  description: 'Multipurpose eCommerce Template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure countdownTime is calculated in a useEffect to avoid SSR issues
  const serverTimeLeft: CountdownTimeType | null =
    typeof window !== 'undefined' ? countdownTime() : null;

  return (
    <html lang="en">
      <body className={instrument.className}>
        <GlobalProvider>
          {children}
          {serverTimeLeft && <ModalCart serverTimeLeft={serverTimeLeft} />}
          <ModalWishlist />
          <ModalSearch />
          <ModalQuickview />
          <ModalCompare />
        </GlobalProvider>
      </body>
    </html>
  );
}