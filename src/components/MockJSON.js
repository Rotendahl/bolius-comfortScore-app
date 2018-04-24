export const MockJSON = {
  "currentScore": 0,
  "potentialScore": -1,
  "activeSlide": 0,
  "address": "Ulkjærvej 3, 6711 Gredstedbro",
  "sliders": [
    {
      "name": "Træk",
      "value": Math.floor(Math.random() * 100)
      },
    {
      "name": "Temperatur",
      "value": Math.floor(Math.random() * 100)
      },
    {
      "name": "Fugt",
      "value": Math.floor(Math.random() * 100)
      },
    {
      "name": "Støj",
      "value": Math.floor(Math.random() * 100)
      },
    {
      "name": "Dagslys",
      "value": Math.floor(Math.random() * 100)
      },
    {
      "name": "Lugt",
      "value": Math.floor(Math.random() * 100)
      }
    ],
  cards: [
    {
      title: "Udskiftning af vinduer med 3 lags termoruder",
      done: false,
      willDo: false,
      targets: ["Støj", "Lugt"],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen.",
      },
    {
      title: "Sol celler",
      done: false,
      willDo: false,
      targets: ["Temperatur", "Lugt", 'Dagslys'],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
      },
    {
      title: "Renovation af loft",
      done: false,
      willDo: false,
      targets: ["Temperatur"],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
      }, {
      title: "Udskiftning af vinduer med 3 lags termoruder",
      done: false,
      willDo: false,
      targets: ["Temperatur", "Lugt", 'Dagslys', 'Støj'],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
      },
    {
      title: "Sol celler",
      done: false,
      willDo: false,
      targets: ['Dagslys', 'Støj'],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
      },
    {
      title: "Renovation af loft",
      done: false,
      willDo: false,
      targets: ["Temperatur", "Lugt"],
      description: "Udskiftning af vinduer giver et mindre støj nieavu samt en bedre temperatur da det holder på varmen."
      }
    ]
}
