import React, { useEffect, useState } from 'react';
import './FriendsManager.css';

/**
 * Base endpoint for all relation-related operations.
 * Using a constant at the module level makes it easy to
 * swap for another environment (e.g. production) later.
 */
const API = 'http://localhost:3001/users/relations';

/**
 * FriendsManager
 * ---------------
 * Dashboard allowing a user to:
 * • send friendship / relative requests by e‑mail
 * • accept / refuse incoming requests
 * • list and remove already‑accepted relations
 *
 * Props
 * -----
 * @param {{ userId: number }} props
 *   – userId: the *connected* user's identifier
 */
const FriendsManager = ({ userId }) => {
  /* ----------------- Local state ------------------ */
  // All platform users (except the connected one) → used
  // to resolve e‑mail addresses ↔ user IDs & display names
  const [users, setUsers] = useState([]);

  // Accepted relations (friends / parents / close ones)
  const [friends, setFriends] = useState([]);

  // Incoming relation requests the user still needs to review
  const [pending, setPending] = useState([]);

  // Controlled field for the e‑mail typed in the "add" input
  const [emailToAdd, setEmailToAdd] = useState('');

  // Current relation type selected in the <select>
  const [relationType, setRelationType] = useState('ami');

  // User feedback messages after a "send request" attempt
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  /* ------------ Fetch helpers ------------- */

  // Fetch the list of all users once (or when userId changes)
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      // Exclude the connected user from the array
      .then(data => setUsers(data.filter(u => u.Id_User !== userId)))
      .catch(console.error); // minimal error handling
  }, [userId]);

  // Wrapper fetching the accepted relations of the user
  const fetchFriends = () => {
    fetch(`${API}/accepted/${userId}`)
      .then(res => res.json())
      .then(setFriends)
      .catch(console.error);
  };

  // Wrapper fetching the *pending* requests received by the user
  const fetchPending = () => {
    fetch(`${API}/pending/${userId}`)
      .then(res => res.json())
      .then(setPending)
      .catch(console.error);
  };

  // Run both fetchers on mount & when userId changes
  useEffect(() => {
    fetchFriends();
    fetchPending();
  }, [userId]);

  /* -------------- Event handlers --------------- */

  /**
   * Send a relation request to an e‑mail.
   * 1. Resolve e‑mail → user_id_2
   * 2. POST /request
   * 3. Show feedback & refresh pending list
   */
  const sendRequest = () => {
    setAddError('');
    setAddSuccess('');

    if (!emailToAdd) return; // soft‑fail if field is empty

    const user = users.find(u => u.mail === emailToAdd);
    if (!user) {
      setAddError('Utilisateur introuvable');
      return;
    }

    fetch(`${API}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id_1: userId,
        user_id_2: user.Id_User,
        relation_type: relationType,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setAddSuccess('Demande envoyée !');
          setEmailToAdd('');
          fetchPending(); // refresh notifications
        } else {
          setAddError(data.message || "Erreur lors de l'envoi de la demande");
        }
      })
      .catch(() => setAddError('Erreur réseau'));
  };

  /** Accept a pending request coming from `user_id_1`. */
  const acceptRequest = (user_id_1) => {
    fetch(`${API}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id_1, user_id_2: userId }),
    })
      .then(res => res.json())
      .then(() => {
        fetchFriends();
        fetchPending();
      })
      .catch(console.error);
  };

  /** Reject (delete) a pending request. */
  const rejectRequest = (user_id_1) => {
    fetch(`${API}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id_1, user_id_2: userId }),
    })
      .then(res => res.json())
      .then(fetchPending)
      .catch(console.error);
  };

  /** Remove *any* relation (both parties symmetrical). */
  const deleteRelation = (otherId) => {
    fetch(`${API}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id_1: userId, user_id_2: otherId }),
    })
      .then(res => res.json())
      .then(fetchFriends)
      .catch(console.error);
  };

  /* ---------- Render helpers / JSX ---------- */
  return (
    <div className="friends-container">
      <h3>Gérer mes amis/proches</h3>

      {/* ---- Add relation form ---- */}
      <div className="friends-form">
        <input
          type="email"
          placeholder="Adresse mail de l'utilisateur à ajouter"
          value={emailToAdd}
          onChange={e => setEmailToAdd(e.target.value)}
        />
        <select
          value={relationType}
          onChange={e => setRelationType(e.target.value)}
        >
          <option value="ami">Ami</option>
          <option value="parent">Parent</option>
          <option value="proche">Proche</option>
        </select>
        <button onClick={sendRequest}>
          Envoyer une demande
        </button>

        {/* Feedback messages */}
        {addError && (
          <div className="friends-feedback-error">{addError}</div>
        )}
        {addSuccess && (
          <div className="friends-feedback-success">{addSuccess}</div>
        )}
      </div>

      {/* ---- Pending requests ---- */}
      <div className="friends-pending">
        <h4>Demandes reçues</h4>
        {pending.length === 0 && <div>Aucune demande en attente.</div>}
        {pending.map(r => (
          <div key={r.id} className="friends-pending-item">
            De l'utilisateur {r.user_id_1} (
            {users.find(u => u.Id_User === r.user_id_1)?.mail || '...'}), type:{' '}
            {r.relation_type}
            <button
              onClick={() => acceptRequest(r.user_id_1)}
            >
              Accepter
            </button>
            <button
              onClick={() => rejectRequest(r.user_id_1)}
            >
              Refuser
            </button>
          </div>
        ))}
      </div>

      {/* ---- Accepted relations ---- */}
      <div>
        <h4>Mes amis/proches</h4>
        {friends.length === 0 && <div>Aucun ami/proche accepté.</div>}
        {friends.map(r => {
          // Figure out which of the 2 user IDs is "the other person"
          const otherId = r.user_id_1 === userId ? r.user_id_2 : r.user_id_1;
          const user = users.find(u => u.Id_User === otherId);

          return (
            <div key={r.id} className="friends-list-item">
              {user
                ? `${user.firstname} ${user.name} (${user.mail})`
                : `Utilisateur ${otherId}`}{' '}
              - {r.relation_type}
              <button
                onClick={() => deleteRelation(otherId)}
                className="delete-btn"
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsManager;
