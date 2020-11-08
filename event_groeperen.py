import events

event_dict = {}

for event in events.event_list:
    naam = event['Naam']
    datum = event['Datum']
    if datum in event_dict:
        datum_groep = event_dict[datum]
        if naam in datum_groep:
            h_event = datum_groep[naam]
            if type(h_event) is list:
                datum_groep[naam].append(event)
            else:
                datum_groep[naam] = [h_event, event]
        else:
            event_dict[datum] = event
    else:
        event_dict[datum] = {naam: event}

for e in event_dict:
    # print('{}: {}'.format(e, event_dict[e]))
    ed_i = event_dict[e]
    for ed_ii in ed_i:
        ed_iii = ed_i[ed_ii]
        if type(ed_iii) is list:
            print('evenement groep {}'.format(ed_iii))
        # print('{}: {}'.format(e, ed_i[ed_ii]))


# event_dict =
# {datum: {event_naam: event, event_naam, [event, event, event], ..],
#     datum: {event_naam: event, event_naam, event..],
#     datum: {event_naam: event, event_naam, event..],
#     }

# dict_keys(['Naam', 'Datum', 'Naam-1', 'Getoonde starttijd', 'Locatie', 'Tijdschema’s', 'Resourceboekingen', 'Algemeen', 'Audio/ Video registratie', 'Geluid', 'Geluidstafel (monitors)', 'Geluidstafel (front)', 'Licht', 'Lichtconsole', 'Projector', 'Pyro / Rook / Vuur', 'Video', 'Total tickets', 'sold tickets (paid)', 'Notities / Opmerkingen Bijlagen', 'Bijlagen', 'Technische fiche', 'Technische fiche 2', 'Lichtplan', 'Lichtplan 2', 'Hospitality rider'])
