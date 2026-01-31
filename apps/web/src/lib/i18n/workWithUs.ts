export type Locale = "en" | "es" | "pt" | "fr" | "de";

type WorkWithUsCopy = {
  hero: {
    title: string;
    subtitle: string;
    ctaApply: string;
    ctaJoin: string;
  };
  howWeWork: {
    title: string;
    points: string[];
    note: string;
  };
  roles: {
    title: string;
    list: string[];
    note: string;
  };
  values: {
    title: string;
    list: string[];
    note: string;
  };
  join: {
    title: string;
    formTitle: string;
    fields: {
      name: string;
      email: string;
      role: string;
      profile: string;
      message: string;
    };
    submit: string;
    success: string;
    error: string;
    or: string;
  };
  nav: {
    label: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export const workWithUsCopy: Record<Locale, WorkWithUsCopy> = {
  en: {
    hero: {
      title: "Work with Altamira Tech Labs",
      subtitle: "Build intelligent systems with a global, remote-first team.",
      ctaApply: "Apply",
      ctaJoin: "Join our network",
    },
    howWeWork: {
      title: "How we work",
      points: [
        "Remote-first",
        "Async-friendly",
        "Project-based",
        "High autonomy",
        "No micromanagement",
      ],
      note: "This filters the right people.",
    },
    roles: {
      title: "Roles we look for",
      list: [
        "AI / ML Engineer",
        "Fullstack Developer",
        "DevOps / Cloud",
        "Product Designer",
        "Technical Writer",
        "Data Annotator",
      ],
      note: "Even if they’re not open now — this signals scale.",
    },
    values: {
      title: "What we value",
      list: [
        "Ownership",
        "Systems thinking",
        "Communication",
        "Curiosity",
        "Ethics",
      ],
      note: "This attracts your tribe.",
    },
    join: {
      title: "How to join",
      formTitle: "Apply using the form",
      fields: {
        name: "Name",
        email: "Email",
        role: "Role",
        profile: "LinkedIn / GitHub",
        message: "Short message",
      },
      submit: "Submit application",
      success: "Thanks! We’ll get back to you soon.",
      error: "Something went wrong. Please try again.",
      or: "Or send your profile to hello@altamiratechlabs.com",
    },
    nav: {
      label: "Work With Us",
    },
    seo: {
      title: "Work With Us | Altamira Tech Labs",
      description:
        "Join Altamira Tech Labs and work on cutting-edge AI, automation and software projects with a global remote team.",
    },
  },

  es: {
    hero: {
      title: "Trabaja con Altamira Tech Labs",
      subtitle: "Construye sistemas inteligentes con un equipo global y remoto.",
      ctaApply: "Postularme",
      ctaJoin: "Unirme a la red",
    },
    howWeWork: {
      title: "Cómo trabajamos",
      points: [
        "100% remoto",
        "Trabajo asíncrono",
        "Por proyectos",
        "Alta autonomía",
        "Sin micromanagement",
      ],
      note: "Esto filtra a las personas correctas.",
    },
    roles: {
      title: "Roles que buscamos",
      list: [
        "Ingeniero/a de IA / ML",
        "Desarrollador/a Fullstack",
        "DevOps / Cloud",
        "Diseñador/a de Producto",
        "Redactor/a Técnico/a",
        "Anotador/a de Datos",
      ],
      note: "Aunque no estén abiertos ahora — esto comunica crecimiento.",
    },
    values: {
      title: "Lo que valoramos",
      list: [
        "Responsabilidad",
        "Pensamiento sistémico",
        "Comunicación",
        "Curiosidad",
        "Ética",
      ],
      note: "Esto atrae a nuestra tribu.",
    },
    join: {
      title: "Cómo unirte",
      formTitle: "Postúlate usando el formulario",
      fields: {
        name: "Nombre",
        email: "Correo electrónico",
        role: "Rol",
        profile: "LinkedIn / GitHub",
        message: "Mensaje corto",
      },
      submit: "Enviar postulación",
      success: "¡Gracias! Te contactaremos pronto.",
      error: "Algo salió mal. Inténtalo de nuevo.",
      or: "O envía tu perfil a hello@altamiratechlabs.com",
    },
    nav: {
      label: "Trabaja con nosotros",
    },
    seo: {
      title: "Trabaja con nosotros | Altamira Tech Labs",
      description:
        "Únete a Altamira Tech Labs y trabaja en proyectos de IA, automatización y software con un equipo global.",
    },
  },

  pt: {
    hero: {
      title: "Trabalhe com a Altamira Tech Labs",
      subtitle: "Construa sistemas inteligentes com uma equipe global e remota.",
      ctaApply: "Candidatar-se",
      ctaJoin: "Entrar para a rede",
    },
    howWeWork: {
      title: "Como trabalhamos",
      points: [
        "100% remoto",
        "Assíncrono",
        "Por projetos",
        "Alta autonomia",
        "Sem microgerenciamento",
      ],
      note: "Isso filtra as pessoas certas.",
    },
    roles: {
      title: "Perfis que buscamos",
      list: [
        "Engenheiro/a de IA / ML",
        "Desenvolvedor/a Fullstack",
        "DevOps / Cloud",
        "Designer de Produto",
        "Redator Técnico",
        "Anotador de Dados",
      ],
      note: "Mesmo que não estejam abertos agora — isso sinaliza escala.",
    },
    values: {
      title: "O que valorizamos",
      list: [
        "Protagonismo",
        "Pensamento sistêmico",
        "Comunicação",
        "Curiosidade",
        "Ética",
      ],
      note: "Isso atrai a nossa tribo.",
    },
    join: {
      title: "Como entrar",
      formTitle: "Candidate-se pelo formulário",
      fields: {
        name: "Nome",
        email: "Email",
        role: "Função",
        profile: "LinkedIn / GitHub",
        message: "Mensagem curta",
      },
      submit: "Enviar candidatura",
      success: "Obrigado! Entraremos em contato em breve.",
      error: "Algo deu errado. Tente novamente.",
      or: "Ou envie seu perfil para hello@altamiratechlabs.com",
    },
    nav: {
      label: "Trabalhe conosco",
    },
    seo: {
      title: "Trabalhe conosco | Altamira Tech Labs",
      description:
        "Junte-se à Altamira Tech Labs e trabalhe em projetos de IA, automação e software com uma equipe global.",
    },
  },

  fr: {
    hero: {
      title: "Travaillez avec Altamira Tech Labs",
      subtitle: "Construisez des systèmes intelligents avec une équipe globale et distribuée.",
      ctaApply: "Postuler",
      ctaJoin: "Rejoindre le réseau",
    },
    howWeWork: {
      title: "Comment nous travaillons",
      points: [
        "100% à distance",
        "Travail asynchrone",
        "Par projets",
        "Grande autonomie",
        "Pas de micro-management",
      ],
      note: "Cela attire les bonnes personnes.",
    },
    roles: {
      title: "Profils recherchés",
      list: [
        "Ingénieur IA / ML",
        "Développeur Fullstack",
        "DevOps / Cloud",
        "Designer Produit",
        "Rédacteur technique",
        "Annotateur de données",
      ],
      note: "Même si les postes ne sont pas ouverts — cela montre notre ambition.",
    },
    values: {
      title: "Ce que nous valorisons",
      list: [
        "Responsabilité",
        "Pensée systémique",
        "Communication",
        "Curiosité",
        "Éthique",
      ],
      note: "Cela attire notre tribu.",
    },
    join: {
      title: "Comment nous rejoindre",
      formTitle: "Postulez via le formulaire",
      fields: {
        name: "Nom",
        email: "Email",
        role: "Rôle",
        profile: "LinkedIn / GitHub",
        message: "Message court",
      },
      submit: "Envoyer la candidature",
      success: "Merci ! Nous vous contacterons bientôt.",
      error: "Une erreur est survenue. Veuillez réessayer.",
      or: "Ou envoyez votre profil à hello@altamiratechlabs.com",
    },
    nav: {
      label: "Travailler avec nous",
    },
    seo: {
      title: "Travailler avec nous | Altamira Tech Labs",
      description:
        "Rejoignez Altamira Tech Labs et travaillez sur des projets IA, automatisation et logiciels avec une équipe mondiale.",
    },
  },

  de: {
    hero: {
      title: "Arbeite mit Altamira Tech Labs",
      subtitle: "Baue intelligente Systeme mit einem globalen Remote-Team.",
      ctaApply: "Bewerben",
      ctaJoin: "Netzwerk beitreten",
    },
    howWeWork: {
      title: "Wie wir arbeiten",
      points: [
        "100% remote",
        "Asynchron",
        "Projektbasiert",
        "Hohe Autonomie",
        "Kein Mikromanagement",
      ],
      note: "Das zieht die richtigen Menschen an.",
    },
    roles: {
      title: "Gesuchte Rollen",
      list: [
        "KI / ML Ingenieur",
        "Fullstack Entwickler",
        "DevOps / Cloud",
        "Product Designer",
        "Technischer Redakteur",
        "Datenannotator",
      ],
      note: "Auch wenn sie nicht offen sind — das signalisiert Wachstum.",
    },
    values: {
      title: "Was wir schätzen",
      list: [
        "Eigenverantwortung",
        "Systemdenken",
        "Kommunikation",
        "Neugier",
        "Ethik",
      ],
      note: "Das zieht unsere Community an.",
    },
    join: {
      title: "So kannst du beitreten",
      formTitle: "Bewirb dich über das Formular",
      fields: {
        name: "Name",
        email: "E-Mail",
        role: "Rolle",
        profile: "LinkedIn / GitHub",
        message: "Kurze Nachricht",
      },
      submit: "Bewerbung senden",
      success: "Danke! Wir melden uns bald bei dir.",
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      or: "Oder sende dein Profil an hello@altamiratechlabs.com",
    },
    nav: {
      label: "Arbeite mit uns",
    },
    seo: {
      title: "Arbeite mit uns | Altamira Tech Labs",
      description:
        "Werde Teil von Altamira Tech Labs und arbeite an KI-, Automatisierungs- und Softwareprojekten mit einem globalen Team.",
    },
  },
};
