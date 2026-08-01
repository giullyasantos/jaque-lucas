import React, { useState, useEffect } from 'react';
import Image2 from '../media/ringpic.webp';
import axios from 'axios';
import Loading from '../components/loader';

const rsvpEndpoint = process.env.REACT_APP_RSVP_ENDPOINT || '/api/submit-rsvp';

const RSVP = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [invitation, setInvitationValue] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allergies, setAllergies] = useState('');
  const [people, setPeople] = useState('');
  const [whoComing, setWhoComing] = useState('');

  useEffect(() => {
    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });

    preloadImage(Image2).then(() => setIsLoading(false));
  }, []);

  const handleCodeSubmit = () => {
    if (invitation.trim().toUpperCase() === 'JL2026') {
      setIsAuthorized(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Código de convite inválido');
    }
  };

  const handleFinalSubmit = async () => {
    if (!firstName || !lastName || !people) {
      setErrorMessage('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    try {
      setErrorMessage('');
      await axios.post(rsvpEndpoint, {
        firstName,
        lastName,
        people,
        whoComing,
        allergies,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error.response || error.message);
      alert('Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="rsvp fade-in">
      <div className="container">
        <div className="photo">
          <img className="couple-img" src={Image2} alt="Couple" />
        </div>
        <div className="info">
          <div className="content">
            <h1>Confirmar Presença</h1>
            <p className="rsvp-subtitle">Será uma alegria celebrar com você</p>
            <div className="rsvp-rule" />
            {!isAuthorized && (
              <div className="verify">
                <p>
                  Para garantir que tudo esteja preparado para sua chegada, solicitamos gentilmente que você confirme sua presença o mais rápido possível. Sua resposta nos ajudará a planejar a celebração perfeita e garantir que todos tenham um tempo maravilhoso.
                </p>
                <input
                  id="invitation-code"
                  type="text"
                  placeholder="Insira o Código de Convite"
                  value={invitation}
                  onChange={(e) => setInvitationValue(e.target.value)}
                />
                <button onClick={handleCodeSubmit}>Enviar</button>
                {errorMessage && <p id="error-message">{errorMessage}</p>}
              </div>
            )}
            {isAuthorized && !isSubmitted && (
              <div className="sign-in">
                <div className="next-to-each-other">
                  <input
                    type="text"
                    placeholder="Nome:"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Sobrenome:"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Número de acompanhantes (ex: 2)"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nome dos acompanhantes (ex: Maria)"
                  value={whoComing}
                  onChange={(e) => setWhoComing(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Alguma alergia alimentar que devamos saber?"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                <button onClick={handleFinalSubmit}>Enviar</button>
                {errorMessage && <p id="error-message">{errorMessage}</p>}
              </div>
            )}
            {isSubmitted && (
              <div className="thank-you">
                <h2>Agradecemos por confirmar sua presença!</h2>
                <p>Estamos ansiosos para celebrar com você!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
