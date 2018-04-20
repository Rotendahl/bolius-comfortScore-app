export const initialState = {
  "currentScore": 1,
  "potentialScore": 1,
  "address": "Ulkjærvej 3, 6711 Gredstedbro",
  "sliders": [{
    "name": "Træk",
    "value": 1
    }, {
    "name": "Temperatur",
    "value": 1
    }, {
    "name": "Fugt",
    "value": 1
    }, {
    "name": "Støj",
    "value": 1
    }, {
    "name": "Dagslys",
    "value": 1
    }, {
    "name": "Lugt",
    "value": 1
    }],
  "improvements": [{
    "Name": "Udskiftning af vinduer",
    "Description": "Skiftning af viduer",
    "targets": ["Støj", "Temperatur"],
    "status": "Done"
    }]
}