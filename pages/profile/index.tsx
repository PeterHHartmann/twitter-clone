import icon from '../../public/icon/stars.svg'
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';
import DeckLayout from '../../layouts/DeckLayout';
import MainLayout from '../../layouts/MainLayout';
import Header from '../../components/Header';
import TweetWidget from '../../components/TweetWidget/TweetWidget';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Header name='Profile' href='/profile' />
      <TweetWidget />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout path='/profile'>
      <DeckLayout>{page}</DeckLayout>
    </MainLayout>
  );
};

export default Page;