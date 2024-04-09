interface HeaderProps {
  title: string; // Título do cabeçalho
  isAuthenticated: boolean; // Indica se o usuário está autenticado
  username?: string; // Nome de usuário, opcional se isAuthenticated for true
  onLoginClick?: () => void; // Função de retorno de chamada para lidar com o clique no botão de login
}

const Header: React.FC<HeaderProps> = ({ title, isAuthenticated, username, onLoginClick }) => {
  return (
    <header className="flex bg-blue-500 p-4 justify-between">
      <div className="logo flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        <h1 className="text-white pl-3">{title}</h1>
      </div>

      <div className="menuNav">
        <nav>
          <ul className="flex space-x-4" data-testid="navegacao">
            <li className="text-white hover:text-gray-300">ReactJS</li>
            <li className="text-white hover:text-gray-300">Typescript</li>
            <li className="text-white hover:text-gray-300">Jest</li>
            <li className="text-white hover:text-gray-300">Tailwind</li>
            <li className="text-white hover:text-gray-300">NextJS</li>
          </ul>
        </nav>
      </div>

      <div className="menuUser">
        <nav>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li className="text-white hover:text-gray-300">Olá, {username}</li>
              </>
            ) : (
              <>
                <li className="text-white hover:text-gray-300" onClick={onLoginClick}>Login</li>
              </>
            )}
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
