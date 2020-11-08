let events = events_response.response;
console.log(events);

let date_now = new Date(Date.now());

let body_0 = document.body;
let div_0 = document.createElement('div');
const tijd_string =  'Getoonde starttijd';
const yp_host = 'https://ccdefactorij.yesplan.be';

let vandaag_gevonden = false;
date_options = {
  weekday: 'short',
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
}

let div_1 = document.createElement('div');
let form_1 = document.createElement('form');
let select_1 = document.createElement('select');
let option_1 = document.createElement('option');
option_1.value = date_now.getTime();
option_1.text = date_now.toLocaleDateString(undefined, date_options);

select_1.append(option_1);
form_1.append(select_1);
div_1.append(form_1);
div_0.append(div_1);

function date_sort(event_one, event_two) {
  let e1_start = new Date(event_one.Datum + 'T00:00:00+00:00');
  let e2_start = new Date(event_two.Datum + 'T00:00:00+00:00');

  let e1_tijd = event_one['Getoonde starttijd'];
  if (e1_tijd) {
    e1_start = new Date(event_one.Datum + 'T' + e1_tijd);
  }

  let e2_tijd = event_two['Getoonde starttijd'];
  if (e2_tijd) {
    e2_start = new Date(event_two.Datum + 'T' + e2_tijd);
  }

  if (e1_start === null || e2_start === null) {
    return 0;
  } else if (e1_start > e2_start) {
    return 1;
  } else if (e1_start < e2_start) {
    return -1;
  } else {
    return 0;
  }
}

events.sort(date_sort);

let schema_events = {};

events.forEach( e => {
  let div_a = document.createElement('div');
  div_a.style = 'padding: 0.5em; border: 2px solid grey;';
  let div_b = document.createElement('div');

  let {
    Locatie: { name: locatie_naam },
    Datum: datum,
    Naam: naam,
    'Naam-1': naam1,
    'Getoonde starttijd': tijd,
    "Tijdschema’s": ts,
    Bijlagen: bijlagen,
    Algemeen: algemeen,
    'Audio/ Video registratie': av,
    Geluid: geluid,
    'Geluidstafel (monitors)': monitor_tafel,
    Licht: licht,
    Lichtconsole: licht_console,
    Projector: projector,
    'Pyro / Rook / Vuur': pyro,
    Video: video,
    'sold tickets (paid)': paid_tickets,
    'Total tickets': total_tickets,
    'Hospitality rider': hospitality,
    Lichtplan: lichtplan,
    'Lichtplan 2': lichtplan_2,
    'Technische fiche': tech_fiche,
    'Technische fiche 2': tech_fiche_2,
    'Notities / Opmerkingen Bijlagen': opmerkingen,
  } = e;

  if (tijd) {
    e_date = new Date(datum + 'T' + tijd);
    d_opts = {
      weekday: 'short',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }
    e_date_string = e_date.toLocaleDateString(undefined, d_opts);
  } else {
    e_date = new Date(datum + 'T00:00:00');
    d_opts = {
      weekday: 'short',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }
    e_date_string = e_date.toLocaleDateString(undefined, d_opts);
  }
  div_b.innerHTML = `${e_date_string} | ${naam}<br/>`;
  div_b.innerHTML += `${locatie_naam} | ${naam1}`;
  div_a.append(div_b);

  if (datum in schema_events) {
    events_vandaag = schema_events[datum];
    console.log(events_vandaag);
    let e_length = events_vandaag.length;
    console.log(e_length);
    let prev = events_vandaag[e_length - 1];
    console.log(prev);
    if (prev.Naam === naam) {
      let new_prev = [];
      new_prev.push(prev);
      new_prev.push(e);
      prev = new_prev;
    } else {
      events_vandaag.push(e);
    }
  } else {
    schema_events[datum] = [e];
  }

  if (ts) {
    ts.forEach( es => {
      let {
        description,
        start,
        end,
        tag,
      } = es;
      if (tag === 'stop') {
        return;
      }
      let div_c = document.createElement('div');
      es_start_date = new Date(start);
      es_start = es_start_date.toLocaleTimeString();
      if (start === end) {
        div_c.innerHTML = `${description} ${es_start}`;
      } else {
        es_end_date = new Date(end);
        es_end = es_end_date.toLocaleTimeString();
        div_c.innerHTML = `${description} ${es_start} - ${es_end}`;
      }
      div_a.append(div_c);
    });
  }

  e.Resourceboekingen.forEach( er => {
    if (er.group.name !== 'Locaties') {
      role_name = false;
      if (er.role) {
        let role_name = er.role.name;
      }
      let div_d = document.createElement('div');
      let div_d_html = '';
      div_d_html += `${er.group.name} ${er.name}`;
      if (role_name) {
        div_d_html += `${role_name}`;
      }
      div_d.innerHTML = div_d_html;
      div_a.append(div_d);
    }
  });

  if (algemeen) {
    let div_algemeen = document.createElement('div');
    div_algemeen.innerHTML = `algemeen: ${algemeen}`;
    div_a.append(div_algemeen);
  }

  if (geluid) {
    let div_geluid = document.createElement('div');
    div_geluid.innerHTML = `geluid: ${geluid}`;
    div_a.append(div_geluid);
  }

  if (monitor_tafel) {
    let div_monitor_tafel = document.createElement('div');
    div_monitor_tafel.innerHTML = `monitor tafel: ${monitor_tafel}`;
    div_a.append(div_monitor_tafel);
  }

  if (licht) {
    let div_licht = document.createElement('div');
    div_licht.innerHTML = `licht: ${licht}`;
    div_a.append(div_licht);
  }

  if (licht_console) {
    let div_licht_console = document.createElement('div');
    div_licht_console.innerHTML = `licht console: ${licht_console}`;
    div_a.append(div_licht_console);
  }

  if (projector) {
    let div_projector = document.createElement('div');
    div_projector.innerHTML = `projector: ${projector}`;
    div_a.append(div_projector);
  }

  if (pyro) {
    let div_pyro = document.createElement('div');
    div_pyro.innerHTML = `pyro: ${pyro}`;
    div_a.append(div_pyro);
  }

  if (video) {
    let div_video = document.createElement('div');
    div_video.innerHTML = `video: ${video}`;
    div_a.append(div_video);
  }

  if (paid_tickets) {
    let div_paid_tickets = document.createElement('div');
    div_paid_tickets.innerHTML = `paid tickets: ${paid_tickets}`;
    div_a.append(div_paid_tickets);
  }

  if (total_tickets) {
    let div_total_tickets = document.createElement('div');
    div_total_tickets.innerHTML = `total tickets: ${total_tickets}`;
    div_a.append(div_total_tickets);
  }

  if (bijlagen) { 
    bijlagen.forEach( eb => {
      let div_e = document.createElement('div');
      div_e.innerHTML = `<a href="${yp_host}/${eb.url}">${eb.name}</a>`;
      // div_e.innerHTML = `bijlage ${eb.name}`;
      div_a.append(div_e);
    });
  }
  
  if (opmerkingen) {
    let div_opmerkingen = document.createElement('div');
    div_opmerkingen.innerHTML = `opmerkingen: ${opmerkingen}`;
    div_a.append(div_opmerkingen);
  }

  if (tech_fiche) {
    let div_tech_fiche = document.createElement('div');
    div_tech_fiche.innerHTML = `<a href="${yp_host}/${tech_fiche.URL}">tech_fiche</a>`;
    div_a.append(div_tech_fiche);
  }

  if (tech_fiche_2) {
    let div_tech_fiche_2 = document.createElement('div');
    div_tech_fiche_2.innerHTML = `<a href="${yp_host}/${tech_fiche_2.URL}">tech_fiche_2</a>`;
    div_a.append(div_tech_fiche_2);
  }

  if (lichtplan) {
    let div_lichtplan = document.createElement('div');
    div_lichtplan.innerHTML = `<a href="${yp_host}/${lichtplan.URL}">lichtplan</a>`;
    div_a.append(div_lichtplan);
  }

  if (lichtplan_2.URL) {
    let div_lichtplan_2 = document.createElement('div');
    div_lichtplan_2.innerHTML = `<a href="${yp_host}/${lichtplan_2.URL}">lichtplan</a>`;
    div_a.append(div_lichtplan_2);
  }

  div_0.append(div_a);

});

body_0.append(div_0);

console.log('schema_events: ');
console.log(schema_events);
