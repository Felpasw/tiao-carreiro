import Header from './components/Header';
import FormInitialPage from './components/FormInitialPage';

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center  bg-main-image bg-no-repeat bg-cover bg-white">
      <Header />
      <FormInitialPage />
    </main>
  );
}
