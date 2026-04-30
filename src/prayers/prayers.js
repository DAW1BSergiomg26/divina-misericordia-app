export const PRAYERS = {
  offerings: {
    flowers: {
      title: "Ofrenda de Flores",
      text: "María, Madre de la Misericordia, te ofrezco estas flores con amor, por Jesús y por las almas del mundo entero. Amén."
    },
    incense: {
      title: "Ofrenda de Incienso",
      text: "Señor Jesús, te ofrezco este incienso como símbolo de mi oración que se eleva hasta tu Trono de Misericordia. Amén."
    },
    trust: {
      title: "Acto de Confianza",
      text: "Jesús, En Vos Confío."
    }
  },

  mercy: [
    {
      title: "Tres de la tarde",
      text: "Tres de la tarde. Hora de la muerte de Jesús. Esta es la Hora de la gran Misericordia para el mundo entero."
    },
    {
      title: "Oh Sangre y Agua",
      text: "Oh Sangre y Agua que brotaste del Corazón de Jesús como una fuente de Misericordia para nosotros, Jesús, En Vos Confío."
    },
    {
      title: "Padre Eterno",
      text: "Padre Eterno, en esta Hora Sagrada, mira a la humanidad a través de tu amadísimo Hijo Jesús crucificado. Ten misericordia de nosotros y del mundo entero."
    },
    {
      title: "Fuente de vida",
      text: "Oh Fuente de vida, insondable Misericordia Divina, inunda al mundo entero derramando sobre nosotros tu gracia. Amén."
    }
  ],

  chaplet: [
    {
      title: "Señal de la Cruz",
      text: "En el nombre del Padre, del Hijo y del Espíritu Santo. Amén."
    },
    {
      title: "Padre Nuestro",
      text: "Padre nuestro que estás en el cielo, santificado sea tu nombre. Venga a nosotros tu reino. Hágase tu voluntad así en la tierra como en el cielo. Amén."
    },
    {
      title: "Ave María",
      text: "Dios te salve María, llena eres de gracia. El Señor es contigo. Bendita tú eres entre todas las mujeres. Amén."
    },
    {
      title: "Credo",
      text: "Creo en Dios Padre todopoderoso, creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor. Amén."
    },
    ...Array.from({ length: 5 }, (_, decade) => [
      {
        title: `Decena ${decade + 1} · Padre Eterno`,
        text: "Padre Eterno, yo te ofrezco el Cuerpo y la Sangre, el Alma y la Divinidad de tu amadísimo Hijo, nuestro Señor Jesucristo, como propiciación por nuestros pecados y los del mundo entero."
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        title: `Decena ${decade + 1} · Cuenta ${i + 1}`,
        text: "Por su dolorosa Pasión, ten misericordia de nosotros y del mundo entero."
      }))
    ]).flat(),
    {
      title: "Santo Dios",
      text: "Santo Dios, Santo Fuerte, Santo Inmortal, ten misericordia de nosotros y del mundo entero."
    },
    {
      title: "Oración final",
      text: "Oh Sangre y Agua que brotaste del Corazón de Jesús como fuente de misericordia para nosotros, Jesús, En Vos Confío."
    }
  ],

  novena: [
    "Primer día: hoy tráeme a toda la humanidad, especialmente a todos los pecadores.",
    "Segundo día: hoy tráeme a las almas de los sacerdotes y religiosos.",
    "Tercer día: hoy tráeme a todas las almas devotas y fieles.",
    "Cuarto día: hoy tráeme a los que no creen en Dios y a los que todavía no me conocen.",
    "Quinto día: hoy tráeme a las almas de los hermanos separados.",
    "Sexto día: hoy tráeme a las almas mansas y humildes, y a los niños pequeños.",
    "Séptimo día: hoy tráeme a las almas que veneran especialmente mi Misericordia.",
    "Octavo día: hoy tráeme a las almas del purgatorio.",
    "Noveno día: hoy tráeme a las almas tibias."
  ].map((text, index) => ({
    title: `Novena · Día ${index + 1}`,
    text
  })),

  cross: [
    "Oración inicial del Vía Crucis.",
    "I Estación · Jesús es condenado a muerte.",
    "II Estación · Jesús carga con la Cruz.",
    "III Estación · Jesús cae por primera vez.",
    "IV Estación · Jesús encuentra a su Madre.",
    "V Estación · El Cirineo ayuda a Jesús.",
    "VI Estación · La Verónica limpia el rostro de Jesús.",
    "VII Estación · Jesús cae por segunda vez.",
    "VIII Estación · Jesús consuela a las mujeres.",
    "IX Estación · Jesús cae por tercera vez.",
    "X Estación · Jesús es despojado de sus vestiduras.",
    "XI Estación · Jesús es clavado en la Cruz.",
    "XII Estación · Jesús muere en la Cruz.",
    "XIII Estación · Jesús es bajado de la Cruz.",
    "XIV Estación · Jesús es sepultado.",
    "Oración final del Vía Crucis."
  ].map((text) => ({
    title: text,
    text: "Te adoramos, Cristo, y te bendecimos, porque por tu Santa Cruz redimiste al mundo. Jesús, En Vos Confío."
  })),

  rosary: [
    {
      title: "Señal de la Cruz",
      text: "En el nombre del Padre, del Hijo y del Espíritu Santo. Amén."
    },
    {
      title: "Credo",
      text: "Creo en Dios Padre todopoderoso, creador del cielo y de la tierra. Amén."
    },
    {
      title: "Padre Nuestro",
      text: "Padre nuestro que estás en el cielo, santificado sea tu nombre. Amén."
    },
    ...Array.from({ length: 53 }, (_, i) => ({
      title: `Ave María · Cuenta ${i + 1}`,
      text: "Dios te salve María, llena eres de gracia, el Señor es contigo. Amén."
    })),
    {
      title: "Gloria",
      text: "Gloria al Padre, al Hijo y al Espíritu Santo. Amén."
    }
  ]
};