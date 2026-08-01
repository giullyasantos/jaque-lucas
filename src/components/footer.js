import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logoFooter from '../media/content/design-assets/logofooter.png';

import '../App.css';

const Footer = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate('/');

  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">
          <img
            src={logoFooter}
            alt="J&L Logo"
            width="100%"
            style={{ cursor: 'pointer' }}
            onClick={handleLogoClick}
          />
        </div>

        <div className="footer-links">
          <div className="footer-row">
            <div className="footer-column">
              <h3>PRESENTES</h3>
              <Link to="/gifts">Contribua</Link>
            </div>
          </div>
          <div className="footer-row">
            <div className="footer-column">
              <h3>LOCALIZAÇÃO</h3>
              <Link to="https://www.google.com/maps?sca_esv=63657ae716cdf89c&sxsrf=AHTn8zrTeuJIeWkxzSfjpQcHh4Pga2R4rQ:1737730927845&iflsig=ACkRmUkAAAAAZ5O5fxKKRDKHP_fkR0W3j0N8ZqceZ9TI&uact=5&gs_lp=Egdnd3Mtd2l6Ig9ncmFudnVsbGUgZmFybXMyDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA0yBxAAGIAEGA0yDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA0yDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA0yDRAuGIAEGMcBGA0YrwEyDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA1I8x5QAFiFHnADeACQAQCYAbUBoAGSEqoBBDAuMTe4AQPIAQD4AQGYAhSgAtMSqAIKwgIKECMYgAQYJxiKBcICBBAjGCfCAhEQLhiABBixAxjRAxiDARjHAcICCBAAGIAEGLEDwgIKEAAYgAQYQxiKBcICCxAAGIAEGLEDGIMBwgIHECMYJxjqAsICCxAAGIAEGJECGIoFwgIKEC4YgAQYQxiKBcICFxAuGIAEGLEDGIMBGMcBGJgFGJoFGK8BwgITEC4YgAQYsQMYQxjHARiKBRivAcICDhAuGIAEGMcBGI4FGK8BwgIXEC4YgAQYxwEYmAUYmQUYngUYjgUYrwHCAgUQABiABMICCxAuGIAEGMcBGK8BwgIHEAAYgAQYCsICDRAuGIAEGNEDGMcBGArCAhkQLhiABBixAxiDARjHARiYBRgKGJoFGK8BwgITEC4YgAQYsQMYxwEYChiOBRivAcICDRAuGIAEGMcBGAoYrwHCAgoQABiABBixAxgKwgIQEC4YgAQYxwEYChiOBRivAcICGRAuGIAEGLEDGMcBGJgFGAoYmgUYngUYrwHCAhMQLhiABBjHARiYBRgKGJsFGK8BwgINEC4YgAQYsQMYQxiKBcICCxAuGIAEGLEDGIMBwgIIEC4YgAQYsQPCAgUQLhiABMICDhAuGIAEGLEDGMcBGK8BwgIKEC4YgAQYsQMYCsICBxAuGIAEGArCAg0QABiABBixAxiDARgKwgINEC4YgAQYsQMYgwEYCsICEBAuGIAEGLEDGMcBGAoYrwHCAgcQLhiABBgNmAMD8QXNKzBDn3OvKJIHBDMuMTegB-iNAg&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KR_Dkn6EGeeIMeiBTZs1fMbW&daddr=954+N+Prevatt+Ave,+Lake+Helen,+FL+32744">Obter Direções</Link>
            </div>
            <div className="footer-column">
              <h3>CONFIRMAÇÃO</h3>
              <Link to="/rsvp">Confirmar presença</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Jaqueline &amp; Lucas <br />
          Desenvolvido e Projetado por{' '}
          <a href="https://www.linkedin.com/in/giullya-souza-santos-01668a23b/">
            <strong>Giullya Santos</strong>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
