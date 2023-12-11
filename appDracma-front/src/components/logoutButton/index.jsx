const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("https://scaisbcaisbcapiucbcapucspasc31231hp.vercel.app/api/auth/logout", {
        method: "POST",
        credentials: "include", // Para enviar cookies
      });

      if (response.ok) {
        // Remover o token JWT do armazenamento local
        localStorage.removeItem('token');

        // Redirecionar ou realizar outras ações pós-logout
        window.location.href = '/';  // Redireciona para a página de login
      } else {
        console.error('Erro durante o logout:', response.statusText);
      }
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
