let events = events_response.response;
console.log(events);

let date_now = Date.now();

let body_0 = document.body;
let div_0 = document.createElement('div');
const tijd_string =  'Getoonde starttijd';
const yp_host = '<niet voor scm>';

function date_sort(event_one, event_two) {
  let e1_tijd = event_one[tijd_string];
  let e2_tijd = event_two[tijd_string];
  let e1_start = new Date(event_one.Datum + 'T00:00:00+00:00');
  let e2_start = new Date(event_two.Datum + 'T00:00:00+00:00');
  if (e1_tijd) {
    let e1_start = new Date(event_one.Datum + 'T' + e1_tijd);
    let e2_start = new Date(event_two.Datum + 'T' + e2_tijd);
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

events.forEach( e => {
  let div_a = document.createElement('div');
  div_a.style = 'padding: 0.5em; border: 2px solid grey;';
  let div_b = document.createElement('div');

  let tijd = e[tijd_string];
  let ts = e["Tijdschema’s"];
  let bijlagen = e.Bijlagen;
  let algemeen = e.Algemeen;
  let av = e['Audio/ Video registratie'];
  let geluid = e.Geluid;
  let monitor_tafel = e['Geluidstafel (monitors)'];
  let licht = e.Licht;
  let licht_console = e.Lichtconsole;
  let projector = e.Projector;
  let pyro = e['Pyro / Rook / Vuur'];
  let video = e.Video;
  let paid_tickets = e['sold tickets (paid)'];
  let total_tickets = e['Total tickets'];
  let hospitality = e['Hospitality rider'];
  let lichtplan = e.Lichtplan;
  let lichtplan_2 = e['Lichtplan 2'];
  let tech_fiche = e['Technische fiche'];
  let tech_fiche_2 = e['Technische fiche 2'];
  let opmerkingen = e['Notities / Opmerkingen Bijlagen'];

  if (tijd) {
    e_tijd = new Date(e.Datum + 'T' + tijd);
    div_b.innerHTML = `${e_tijd} - ${e.Locatie.name}<br />${e.Naam} - ${e.Naam-1}`;
  } else {
    div_b.innerHTML = `${e.Naam} - ${e.Locatie.name} - ${e.Naam-1}`;
  }
  div_a.append(div_b);

  if (ts) {
    ts.forEach( es => {
      let div_c = document.createElement('div');
      es_start = new Date(es.start);
      if (es.start === es.end) {
        div_c.innerHTML = `${es.description}<br />${es_start}`;
      } else {
        es_end = new Date(es.end);
        div_c.innerHTML = `${es.description}<br />start: ${es_start}<br />end: ${es_end}`;
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
