import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import Footer_Fin from './Footer/Footer_Fin';
import Footer_Pub from './Footer/Footer_Pub';

// Style minimal pour ne pas toucher aux fichiers CSS de l'élève
const calendarStyle = {
  maxWidth: '900px',
  margin: '2rem auto',
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  padding: '1rem',
};

// Style pour la modale
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};
const modalContentStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  minWidth: '320px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
};

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function setTime(date, hours, minutes) {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}
function expandRecurringEvents(events, periodStart, periodEnd) {
  let result = [];
  events.forEach(ev => {
    const rec = Number(ev.Id_Recurrence_enevenement);
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    if (rec === 1) { // Tous les jours
      let current = new Date(periodStart);
      while (current <= periodEnd) {
        const eventStart = setTime(current, start.getHours(), start.getMinutes());
        const eventEnd = setTime(current, end.getHours(), end.getMinutes());
        result.push({
          ...ev,
          start: eventStart.toISOString().slice(0, 19).replace('T', ' '),
          end: eventEnd.toISOString().slice(0, 19).replace('T', ' ')
        });
        current = addDays(current, 1);
      }
    } else if (rec === 2) { // Toutes les semaines
      let current = new Date(periodStart);
      const targetDay = start.getDay();
      while (current.getDay() !== targetDay) {
        current = addDays(current, 1);
      }
      while (current <= periodEnd) {
        const eventStart = setTime(current, start.getHours(), start.getMinutes());
        const eventEnd = setTime(current, end.getHours(), end.getMinutes());
        result.push({
          ...ev,
          start: eventStart.toISOString().slice(0, 19).replace('T', ' '),
          end: eventEnd.toISOString().slice(0, 19).replace('T', ' ')
        });
        current = addDays(current, 7);
      }
    } else if (rec === 3) { // Tous les mois
      let current = new Date(periodStart);
      const targetDate = start.getDate();
      while (current <= periodEnd) {
        if (current.getDate() === targetDate) {
          const eventStart = setTime(current, start.getHours(), start.getMinutes());
          const eventEnd = setTime(current, end.getHours(), end.getMinutes());
          result.push({
            ...ev,
            start: eventStart.toISOString().slice(0, 19).replace('T', ' '),
            end: eventEnd.toISOString().slice(0, 19).replace('T', ' ')
          });
        }
        current = addDays(current, 1);
      }
    } else {
      // Ponctuel
      result.push(ev);
    }
  });
  return result;
}

function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  const creator = event.extendedProps.creator_firstname || event.extendedProps.creator_name
    ? `${event.extendedProps.creator_firstname || ''} ${event.extendedProps.creator_name || ''}`.trim()
    : '';
  return (
    <div title={event.title + (creator ? `\nCréé par : ${creator}` : '')}>
      <b>{event.title}</b>
      {creator && <div style={{fontSize:'0.8em',color:'#555'}}>Créé par : {creator}</div>}
    </div>
  );
}

const Calendar = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '08:00',
    endTime: '09:00',
    Id_Recurrence_enevenement: 4
  });
  const [editEventId, setEditEventId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigate = useNavigate();

  // Fonction pour charger les événements
  const fetchEvents = () => {
    fetch(`http://localhost:3002/events/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error('Erreur: réponse inattendue du backend', data);
          return;
        }
      
        // Détermine la période affichée (mois courant)
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const periodStart = new Date(year, month, 1, 0, 0, 0);
        const periodEnd = new Date(year, month + 1, 0, 23, 59, 59);
        // Génère tous les événements à afficher (ponctuels + récurrents)
        const allEvents = expandRecurringEvents(data, periodStart, periodEnd);
        setEvents(allEvents.map(ev => ({
          id: ev.id,
          title: ev.title || ev.name,
          start: ev.start || ev.start_date,
          end: ev.end || ev.end_date,
          allDay: !!ev.allDay,
          color: ev.color || '#3788d8',
          description: ev.description || '',
          Id_Recurrence_enevenement: ev.Id_Recurrence_enevenement,
          creator_name: ev.creator_name,
          creator_firstname: ev.creator_firstname
        })));
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  // Récupérer la liste des amis/proches acceptés
  useEffect(() => {
    fetch(`http://localhost:3001/users/relations/accepted/${userId}`)
      .then(res => res.json())
      .then(data => setFriends(data));
  }, [userId]);

  // Ouvre la modale à la date cliquée pour création
  const handleDateClick = (info) => {
    setModalDate(info.dateStr);
    setForm({ title: '', description: '', startTime: '08:00', endTime: '09:00', Id_Recurrence_enevenement: 4, creator_name: '', creator_firstname: '' });
    setEditEventId(null);
    setModalOpen(true);
  };

  // Ouvre la modale pour édition d'un événement
  const handleEventClick = (clickInfo) => {
    const ev = clickInfo.event;
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    setModalDate(ev.startStr.slice(0, 10));
    setForm({
      title: ev.title,
      description: ev.extendedProps.description || '',
      startTime: start.toTimeString().slice(0,5),
      endTime: end.toTimeString().slice(0,5),
      Id_Recurrence_enevenement: ev.extendedProps.Id_Recurrence_enevenement || 4,
      creator_name: ev.extendedProps.creator_name || '',
      creator_firstname: ev.extendedProps.creator_firstname || ''
    });
    setEditEventId(ev.id);
    setModalOpen(true);
  };

  // Gère la saisie dans la modale
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gère la sélection des amis à partager
  const handleFriendSelect = (e) => {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setSelectedFriends(prev => [...prev, value]);
    } else {
      setSelectedFriends(prev => prev.filter(id => id !== value));
    }
  };

  // Validation du formulaire (création ou édition)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.startTime || !form.endTime) {
      alert('Merci de remplir tous les champs obligatoires.');
      return;
    }
    const startDateTime = `${modalDate} ${form.startTime}:00`;
    const endDateTime = `${modalDate} ${form.endTime}:00`;
    const newEvent = {
      title: form.title,
      description: form.description || ' ',
      start: startDateTime,
      end: endDateTime,
      Id_Recurrence_enevenement: Number(form.Id_Recurrence_enevenement),
      created_by: userId,
      creator_name: form.creator_name,
      creator_firstname: form.creator_firstname,
      shared_with: selectedFriends
    };
    console.log('Données envoyées au backend :', newEvent);
    let res, data;
    if (editEventId) {
      // Edition
      res = await fetch(`http://localhost:3001/events/${editEventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      data = await res.json();
      if (res.ok) {
        fetchEvents();
        setModalOpen(false);
      } else {
        alert("Erreur lors de la modification de l'événement");
      }
    } else {
      // Création
      res = await fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      data = await res.json();
      if (data.id) {
        await fetch('http://localhost:3001/events/addUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: data.id, userId })
        });
        // Ajouté : associer les amis sélectionnés
        for (const fid of selectedFriends) {
          await fetch('http://localhost:3001/events/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId: data.id, userId: fid })
          });
        }
        fetchEvents();
        setModalOpen(false);
        setSelectedFriends([]); // reset
      } else {
        alert("Erreur lors de la création de l'événement");
      }
    }
  };

  // Ferme la modale
  const handleClose = () => {
    setModalOpen(false);
  };

  // Suppression d'un événement
  const handleDelete = async () => {
    if (!editEventId) return;
    if (!window.confirm('Voulez-vous vraiment supprimer cet événement ?')) return;
    const res = await fetch(`http://localhost:3001/events/${editEventId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      fetchEvents();
      setModalOpen(false);
    } else {
      alert("Erreur lors de la suppression de l'événement");
    }
  };

  return (
    <div style={calendarStyle}>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'1rem'}}>
        <button onClick={() => navigate('/amis')} style={{padding:'0.5rem 1rem',background:'#3788d8',color:'#fff',border:'none',borderRadius:6,cursor:'pointer'}}>
          Gérer mes amis/proches
        </button>
      </div>
      <h2 style={{textAlign:'center'}}>Mon calendrier partagé</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
      {modalOpen && (
        <div style={modalStyle}>
          <form style={modalContentStyle} onSubmit={handleSubmit}>
            <h3>Nouvel événement le {modalDate}</h3>
            <div style={{marginBottom:'1rem'}}>
              <label>Titre*<br/>
                <input name="title" value={form.title} onChange={handleChange} required style={{width:'100%'}} />
              </label>
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label>Description<br/>
                <textarea name="description" value={form.description} onChange={handleChange} style={{width:'100%'}} />
              </label>
            </div>
            <div style={{marginBottom:'1rem', display:'flex', gap:'1rem'}}>
              <label>Heure de début*<br/>
                <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
              </label>
              <label>Heure de fin*<br/>
                <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
              </label>
            </div>
            <div style={{marginBottom:'1rem'}}>
              <label>Répétition<br/>
                <select name="Id_Recurrence_enevenement" value={form.Id_Recurrence_enevenement} onChange={handleChange}>
                  <option value={4}>Ponctuel</option>
                  <option value={1}>Tous les jours</option>
                  <option value={2}>Toutes les semaines</option>
                  <option value={3}>Tous les mois</option>
                </select>
              </label>
            </div>
            {(form.creator_firstname || form.creator_name) && (
              <div style={{marginBottom:'1rem',fontSize:'0.9em',color:'#555'}}>
                Créé par : {form.creator_firstname || ''} {form.creator_name || ''}
              </div>
            )}
            <div style={{marginBottom:'1rem'}}>
              <label>Partager avec :<br/>
                <select multiple value={selectedFriends.map(String)} onChange={e => {
                  const options = Array.from(e.target.selectedOptions);
                  setSelectedFriends(options.map(opt => Number(opt.value)));
                }} style={{width:'100%',minHeight:60}}>
                  {friends.length === 0 && <option disabled>Aucun ami/proche accepté</option>}
                  {friends.map(r => {
                    const otherId = String(r.user_id_1) === String(userId) ? r.user_id_2 : r.user_id_1;
                    return (
                      <option key={r.id} value={otherId}>
                        {r.firstname} {r.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
              {editEventId && (
                <button type="button" onClick={handleDelete} style={{color:'red'}}>Supprimer</button>
              )}
              <button type="button" onClick={handleClose}>Annuler</button>
              <button type="submit">{editEventId ? 'Modifier' : 'Créer'}</button>
            </div>
          </form>
        </div>
      )}
            <Footer_Fin/>
            <Footer_Pub/>
    </div>
  );
};

export default Calendar; 