window.DATOS_PLANO = {
  "elementos": {
    "tarima": {
      "tipo": "tarima",
      "nombre": "Tarima",
      "forma": "rect",
      "x": 383.6,
      "y": 647.9,
      "w": 85.6,
      "h": 20,
      "rot": -25,
      "color": "#e5282e",
      "num": 1,
      "nota": "Tarima de menos de 1 m (no es escenario).\nScaramanzia a las 18 hs, unas 2 horas con presentación y palabras.\nArmado desde las 15 hs, desarme de 20 a 22 hs.",
      "responsable": "Lobo (banda) · Charito (presentación)"
    },
    "gazebo-artistas": {
      "tipo": "gazebo",
      "nombre": "Gazebo de los artistas",
      "forma": "circle",
      "x": 415.5,
      "y": 683.3,
      "r": 11.4,
      "rot": 0,
      "color": "#3aa63a",
      "num": 2,
      "nota": "Para Scaramanzia.\nAgua para la banda y la organización: 4 bidones, 2 dispensers, vasos.",
      "responsable": "Pauli, Tino y Rope · gazebo: Tino"
    },
    "publico": {
      "tipo": "publico",
      "nombre": "Público",
      "forma": "poly",
      "x": 359.1,
      "y": 553.5,
      "rot": 0,
      "escala": 1,
      "color": "#d6c63a",
      "num": 3,
      "nota": "Frente a la tarima, sobre el desnivel para ver mejor.\nSe esperan 80 a 100 personas. Público desde las 16 hs.\nTraé remera lisa para estampar. Sin venta de comida ni bebida.",
      "responsable": "Cami M., José y Mari",
      "pts": [
        [
          -56.6,
          -62.6
        ],
        [
          24.5,
          -64.9
        ],
        [
          30.2,
          -28.4
        ],
        [
          50.7,
          0.2
        ],
        [
          91.8,
          41.8
        ],
        [
          -17.8,
          68.7
        ],
        [
          -48,
          68.7
        ],
        [
          -74.8,
          -23.8
        ]
      ]
    },
    "puestos-mesa": {
      "tipo": "puestos",
      "nombre": "Puestos con mesa",
      "forma": "rect",
      "x": 325.4,
      "y": 473.8,
      "w": 71.4,
      "h": 14.3,
      "rot": -10,
      "color": "#6a1b5a",
      "num": 4,
      "cupos": 8,
      "recibe": true,
      "nota": "Espacio de exposición y venta de productos culturales y merchandising.\nCada puesto trae su mesa. Sin venta de comida ni bebida.",
      "responsable": "Luni, Lauti Rios, Nicky Polo y Lala"
    },
    "puestos-gazebo": {
      "tipo": "puestos",
      "nombre": "Puestos con gazebo",
      "forma": "rect",
      "x": 316.8,
      "y": 426.4,
      "w": 65.6,
      "h": 16,
      "rot": -15,
      "color": "#2f3fcf",
      "num": 5,
      "cupos": 6,
      "recibe": true,
      "nota": "Espacio de exposición y venta de productos culturales y merchandising.\nCada puesto trae su mesa. Sin venta de comida ni bebida.\nLos de gazebo van todos de este lado, atrás, para no tapar la tarima.",
      "responsable": "Luni, Lauti Rios, Nicky Polo y Lala"
    },
    "banos": {
      "tipo": "banos",
      "nombre": "Baños químicos",
      "forma": "circle",
      "x": 486.9,
      "y": 567.9,
      "r": 13.7,
      "rot": 0,
      "color": "#a565f0",
      "num": 6,
      "nota": "Dos baños químicos: uno accesible (con paso libre) y uno común.\nPapel higiénico, lavandina y guantes.",
      "responsable": ""
    },
    "trapo": {
      "tipo": "trapo",
      "nombre": "Pintada del trapo",
      "forma": "circle",
      "x": 268.3,
      "y": 626.2,
      "r": 14.3,
      "rot": 0,
      "color": "#f08a1c",
      "num": 7,
      "nota": "Trapo homenaje pintado en el día.",
      "responsable": ""
    },
    "extintor-1": {
      "tipo": "extintor",
      "nombre": "Extintor",
      "forma": "rect",
      "x": 428.1,
      "y": 623.9,
      "w": 8,
      "h": 8,
      "rot": 0,
      "color": "#e5282e",
      "contorno": true,
      "num": 8,
      "nota": "En las puntas de la tarima. 5 kg ABC.",
      "responsable": ""
    },
    "extintor-2": {
      "tipo": "extintor",
      "nombre": "Extintor",
      "forma": "rect",
      "x": 340.2,
      "y": 671.8,
      "w": 8,
      "h": 8,
      "rot": 0,
      "color": "#e5282e",
      "contorno": true,
      "num": 8,
      "nota": "En las puntas de la tarima. 5 kg ABC.",
      "responsable": ""
    },
    "ambulancia": {
      "tipo": "ambulancia",
      "nombre": "Ambulancia",
      "forma": "rect",
      "x": 578.2,
      "y": 671.8,
      "w": 25,
      "h": 13.7,
      "rot": 0,
      "color": "#c8102e",
      "contorno": true,
      "num": 9,
      "nota": "Ramón y Cajal y Napostá, con salida directa.",
      "responsable": ""
    },
    "toma": {
      "tipo": "toma",
      "nombre": "Toma de luz",
      "forma": "circle",
      "x": 512.6,
      "y": 639.3,
      "r": 16,
      "rot": 0,
      "color": "#22b5ec",
      "num": 10,
      "conectaA": "tarima",
      "nota": "Objeto redondo junto a la ciclovía.\nCable a la tarima: cruza la ciclovía, va con cubrecable.",
      "responsable": "Fran y Guille (sonido)"
    }
  },
  "emprendedores": {},
  "roles": {
    "presentacion": {
      "rol": "Presentación",
      "que": "Conducir, presentar la banda, palabras del medio.",
      "personas": "Charito",
      "orden": 1
    },
    "banda": {
      "rol": "Banda",
      "que": "Contacto con Scaramanzia, horarios, qué necesitan.",
      "personas": "Lobo",
      "orden": 2
    },
    "sonido": {
      "rol": "Sonido",
      "que": "Qué pone la banda y qué ponemos nosotros.",
      "personas": "Fran, Guille",
      "orden": 3
    },
    "cobertura": {
      "rol": "Cobertura",
      "que": "Fotos y video del día y del previo.",
      "personas": "Tyler, Tino",
      "orden": 4
    },
    "emprendedores": {
      "rol": "Emprendedores",
      "que": "Formulario, puestos, mesa propia, ¿gazebo?",
      "personas": "Luni, Lauti Rios, Nicky Polo, Lala, Clari",
      "orden": 5
    },
    "serigrafia": {
      "rol": "Serigrafía",
      "que": "Remeras lisas y estampado en vivo.",
      "personas": "Luni, Morita",
      "orden": 6
    },
    "gente": {
      "rol": "A cargo de la gente",
      "que": "Recibir y orientar.",
      "personas": "Cami M., José, Mari, Valen",
      "orden": 7
    },
    "catering": {
      "rol": "Catering de músicos",
      "que": "Comida y bebida de banda y organización.",
      "personas": "Pauli, Tino, Rope, ValenBau / Cala",
      "orden": 8
    },
    "armado": {
      "rol": "Armado y desarme",
      "que": "Desde las 13 y hasta las 22.",
      "personas": "Lala (solo armado), Charo, Zaira, Cami Álvarez, Mel, Juan",
      "orden": 9
    },
    "prensa": {
      "rol": "Prensa y difusión",
      "que": "Mapa de actores, medios, afiches.",
      "personas": "Guigui, Tony, Anto, COM",
      "orden": 10
    }
  },
  "personas": {
    "charito": {
      "nombre": "Charito"
    },
    "charo": {
      "nombre": "Charo"
    },
    "lobo": {
      "nombre": "Lobo"
    },
    "fran": {
      "nombre": "Fran"
    },
    "guille": {
      "nombre": "Guille"
    },
    "guigui": {
      "nombre": "Guigui"
    },
    "com": {
      "nombre": "COM"
    },
    "luni": {
      "nombre": "Luni"
    },
    "lauti-rios": {
      "nombre": "Lauti Rios"
    },
    "nicky-polo": {
      "nombre": "Nicky Polo"
    },
    "lala": {
      "nombre": "Lala"
    },
    "cami-m": {
      "nombre": "Cami M."
    },
    "cami-alvarez": {
      "nombre": "Cami Álvarez"
    },
    "jose": {
      "nombre": "José"
    },
    "mari": {
      "nombre": "Mari"
    },
    "pauli": {
      "nombre": "Pauli"
    },
    "tino": {
      "nombre": "Tino"
    },
    "rope": {
      "nombre": "Rope"
    },
    "zaira": {
      "nombre": "Zaira"
    },
    "mel": {
      "nombre": "Mel"
    },
    "juan": {
      "nombre": "Juan"
    },
    "valenbau-cala": {
      "nombre": "ValenBau / Cala"
    },
    "clari": {
      "nombre": "Clari"
    },
    "morita": {
      "nombre": "Morita"
    },
    "tony": {
      "nombre": "Tony"
    },
    "anto": {
      "nombre": "Anto"
    },
    "valen": {
      "nombre": "Valen"
    },
    "tyler": {
      "nombre": "Tyler"
    }
  }
};
