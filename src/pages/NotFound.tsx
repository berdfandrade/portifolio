import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';

export default function NotFound() {
  usePageTitle('Não encontrado');
  return (
    <>
      <TopBar title="Bernardo" />
      <main className="project not-found">
        <h1>Página não encontrada</h1>
        <p className="lede">Esse endereço não existe na biblioteca.</p>
        <div className="btns">
          <Link className="btn" to="/">Voltar para a biblioteca</Link>
        </div>
      </main>
    </>
  );
}
