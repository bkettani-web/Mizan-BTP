export type Locale = "fr" | "ar";

export const LOCALES: Locale[] = ["fr", "ar"];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
};

/** Code court affiché dans les sélecteurs compacts (mobile). */
export const LOCALE_SHORT: Record<Locale, string> = {
  fr: "FR",
  ar: "ع",
};

export const DIRECTION: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
};

/** Locale Intl utilisée pour les montants, pourcentages et dates. */
export const INTL_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  ar: "ar-MA",
};

export const CURRENCY_LABEL: Record<Locale, string> = {
  fr: "MAD",
  ar: "درهم",
};

const dictionaries = {
  fr: {
    brand: {
      tagline: "L'équilibre de vos chantiers",
    },
    nav: {
      dashboard: "Tableau de bord",
      dashboardShort: "Accueil",
      chantiers: "Chantiers",
      depenses: "Dépenses",
      fournisseurs: "Fournisseurs",
      rapports: "Rapports",
      parametres: "Paramètres",
      parametresShort: "Réglages",
    },
    status: {
      vert: "Tout va bien",
      orange: "À surveiller",
      rouge: "Dépassement",
    },
    common: {
      addExpense: "Ajouter une dépense",
      viewAll: "Tout voir",
      cancel: "Annuler",
      confirm: "Confirmer",
      allProjects: "Tous les chantiers",
      totalDisplayed: "Total affiché",
      backToProjects: "Tous les chantiers",
      projectNotFoundShort: "Chantier inconnu",
    },
    kpi: {
      budgetTotal: "Budget total",
      spent: "Argent dépensé",
      spentOfBudget: "{percent} du budget",
      remaining: "Reste disponible",
      profit: "Bénéfice prévu",
      profitMargin: "{percent} de marge estimée",
      profitMarginOnProject: "Marge estimée sur ce chantier",
    },
    dashboard: {
      greeting: "Bonjour, voici l'état de vos chantiers",
      subtitle: "Un coup d'œil suffit pour savoir où vous en êtes.",
      myProjects: "Mes chantiers",
      noProjectsTitle: "Vous n'avez pas encore de chantier",
      noProjectsDesc: "Créez le premier en 1 minute pour commencer à suivre son budget.",
      chartTitle: "Dépenses des 6 derniers mois",
      chartSubtitle: "Total dépensé sur l'ensemble de vos chantiers, mois par mois.",
      recentExpenses: "Dernières dépenses",
      noExpensesYet: "Aucune dépense enregistrée pour le moment.",
    },
    projectCard: {
      progress: "Avancement des travaux",
      budgetConsumed: "Budget consommé",
      spentOf: "{spent} dépensés sur {total}",
    },
    projectsPage: {
      title: "Chantiers",
      subtitle: "{count} chantier en cours. Cliquez sur un chantier pour voir le détail.",
      subtitlePlural: "{count} chantiers en cours. Cliquez sur un chantier pour voir le détail.",
    },
    projectDetail: {
      startedOn: "Démarré le {date}",
      expensesOfProject: "Dépenses de ce chantier",
      noExpensesTitle: "Aucune dépense enregistrée",
      noExpensesDesc: "Ajoutez la première dépense de ce chantier avec le bouton ci-dessus.",
      notFoundTitle: "Chantier introuvable",
      notFoundDesc: "Ce chantier n'existe pas ou a été supprimé.",
    },
    expensesPage: {
      title: "Dépenses",
      countOne: "{count} dépense enregistrée au total.",
      countMany: "{count} dépenses enregistrées au total.",
      filterLabel: "Filtrer par chantier",
      noExpensesTitle: "Aucune dépense ici",
      noExpensesDesc: "Changez de filtre ou ajoutez une nouvelle dépense avec le bouton ci-dessus.",
    },
    suppliersPage: {
      title: "Fournisseurs",
      subtitle: "Calculés automatiquement à partir des dépenses enregistrées.",
      noSuppliersTitle: "Aucun fournisseur pour le moment",
      noSuppliersDesc: "Les fournisseurs apparaîtront ici dès qu'ils seront renseignés sur une dépense.",
      expenseOne: "{count} dépense · dernière le {date}",
      expenseMany: "{count} dépenses · dernière le {date}",
    },
    reportsPage: {
      title: "Rapports",
      subtitle: "La synthèse financière de tous vos chantiers, en un coup d'œil.",
      chartSubtitle: "Tous chantiers confondus.",
      detailByProject: "Détail par chantier",
      budget: "Budget",
      spent: "Dépensé",
      remaining: "Reste",
      expectedMargin: "Marge prévue",
    },
    settingsPage: {
      title: "Paramètres",
      languageTitle: "Langue",
      languageDesc: "Choisissez la langue d'affichage de l'application.",
      demoDataTitle: "Données de démonstration",
      demoDataDesc:
        "Toutes les dépenses que vous ajoutez sont sauvegardées sur cet appareil, pour que vous puissiez tester l'application librement.",
      resetButton: "Réinitialiser les données de démonstration",
      resetConfirm: "Les dépenses ajoutées seront remplacées par les données d'origine. Confirmer ?",
      resetDone: "Données réinitialisées.",
      otherSettingsTitle: "Les autres réglages, bientôt ici",
      otherSettingsDesc: "Vous pourrez bientôt gérer votre équipe, votre devise et les préférences de votre compte.",
      comingSoonBadge: "Bientôt disponible",
    },
    expenseForm: {
      title: "Ajouter une dépense",
      subtitle: "Remplissez les informations essentielles, ça prend 1 minute.",
      project: "Chantier",
      projectPlaceholder: "Choisir un chantier",
      description: "Description",
      descriptionPlaceholder: "Ex. Ciment et sable pour le 2e étage",
      amount: "Montant ({currency})",
      date: "Date",
      category: "Catégorie",
      categoryPlaceholder: "Choisir une catégorie",
      addSupplier: "+ Ajouter un fournisseur (optionnel)",
      supplier: "Fournisseur",
      supplierOptional: "(optionnel)",
      supplierPlaceholder: "Ex. Ciments de l'Atlas",
      submit: "Enregistrer la dépense",
      savedTitle: "Dépense enregistrée",
      savedDesc: "Elle est déjà prise en compte dans votre tableau de bord.",
    },
    categories: {
      grosOeuvre: "Gros œuvre",
      mainOeuvre: "Main d'œuvre",
      materiaux: "Matériaux",
      lotsTechniques: "Lots techniques",
      finitions: "Finitions",
      locationMateriel: "Location matériel",
      etudes: "Études",
      administratif: "Administratif",
      autre: "Autre",
    },
  },
  ar: {
    brand: {
      tagline: "توازن أوراشكم",
    },
    nav: {
      dashboard: "لوحة التحكم",
      dashboardShort: "الرئيسية",
      chantiers: "الأوراش",
      depenses: "المصاريف",
      fournisseurs: "الموردون",
      rapports: "التقارير",
      parametres: "الإعدادات",
      parametresShort: "الإعدادات",
    },
    status: {
      vert: "كل شيء على ما يرام",
      orange: "يتطلب المتابعة",
      rouge: "تجاوز الميزانية",
    },
    common: {
      addExpense: "إضافة مصروف",
      viewAll: "عرض الكل",
      cancel: "إلغاء",
      confirm: "تأكيد",
      allProjects: "كل الأوراش",
      totalDisplayed: "المجموع المعروض",
      backToProjects: "كل الأوراش",
      projectNotFoundShort: "ورش غير معروف",
    },
    kpi: {
      budgetTotal: "الميزانية الإجمالية",
      spent: "المبلغ المصروف",
      spentOfBudget: "{percent} من الميزانية",
      remaining: "المتبقي المتاح",
      profit: "الربح المتوقع",
      profitMargin: "{percent} هامش ربح تقديري",
      profitMarginOnProject: "هامش الربح التقديري لهذا الورش",
    },
    dashboard: {
      greeting: "مرحبًا، إليكم وضعية أوراشكم",
      subtitle: "نظرة واحدة تكفي لمعرفة أين أنتم.",
      myProjects: "أوراشي",
      noProjectsTitle: "ليس لديكم ورش بعد",
      noProjectsDesc: "أنشئوا الورش الأول في دقيقة واحدة لبدء متابعة ميزانيته.",
      chartTitle: "مصاريف الأشهر الستة الأخيرة",
      chartSubtitle: "إجمالي ما تم صرفه في كل أوراشكم، شهرًا بشهر.",
      recentExpenses: "آخر المصاريف",
      noExpensesYet: "لا توجد أي مصاريف مسجلة حاليًا.",
    },
    projectCard: {
      progress: "تقدم الأشغال",
      budgetConsumed: "الميزانية المستهلكة",
      spentOf: "{spent} مصروفة من أصل {total}",
    },
    projectsPage: {
      title: "الأوراش",
      subtitle: "ورش واحد قيد الإنجاز. اضغطوا على ورش لعرض التفاصيل.",
      subtitlePlural: "{count} أوراش قيد الإنجاز. اضغطوا على ورش لعرض التفاصيل.",
    },
    projectDetail: {
      startedOn: "انطلق في {date}",
      expensesOfProject: "مصاريف هذا الورش",
      noExpensesTitle: "لا توجد أي مصاريف مسجلة",
      noExpensesDesc: "أضيفوا أول مصروف لهذا الورش عبر الزر أعلاه.",
      notFoundTitle: "الورش غير موجود",
      notFoundDesc: "هذا الورش غير موجود أو تم حذفه.",
    },
    expensesPage: {
      title: "المصاريف",
      countOne: "مصروف واحد مسجل في المجموع.",
      countMany: "{count} مصاريف مسجلة في المجموع.",
      filterLabel: "تصفية حسب الورش",
      noExpensesTitle: "لا توجد مصاريف هنا",
      noExpensesDesc: "غيّروا التصفية أو أضيفوا مصروفًا جديدًا عبر الزر أعلاه.",
    },
    suppliersPage: {
      title: "الموردون",
      subtitle: "محسوبون تلقائيًا انطلاقًا من المصاريف المسجلة.",
      noSuppliersTitle: "لا يوجد أي مورد حاليًا",
      noSuppliersDesc: "سيظهر الموردون هنا بمجرد إدخالهم في أحد المصاريف.",
      expenseOne: "مصروف واحد · آخره في {date}",
      expenseMany: "{count} مصاريف · آخرها في {date}",
    },
    reportsPage: {
      title: "التقارير",
      subtitle: "الملخص المالي لجميع أوراشكم، في نظرة واحدة.",
      chartSubtitle: "جميع الأوراش مجتمعة.",
      detailByProject: "التفاصيل حسب الورش",
      budget: "الميزانية",
      spent: "المصروف",
      remaining: "المتبقي",
      expectedMargin: "الهامش المتوقع",
    },
    settingsPage: {
      title: "الإعدادات",
      languageTitle: "اللغة",
      languageDesc: "اختاروا لغة عرض التطبيق.",
      demoDataTitle: "بيانات تجريبية",
      demoDataDesc:
        "جميع المصاريف التي تضيفونها تُحفظ على هذا الجهاز، لتتمكنوا من تجربة التطبيق بكل حرية.",
      resetButton: "إعادة تعيين البيانات التجريبية",
      resetConfirm: "سيتم استبدال المصاريف المضافة بالبيانات الأصلية. تأكيد؟",
      resetDone: "تمت إعادة تعيين البيانات.",
      otherSettingsTitle: "باقي الإعدادات، قريبًا هنا",
      otherSettingsDesc: "ستتمكنون قريبًا من إدارة فريقكم وعملتكم وتفضيلات حسابكم.",
      comingSoonBadge: "قريبًا",
    },
    expenseForm: {
      title: "إضافة مصروف",
      subtitle: "املؤوا المعلومات الأساسية، الأمر يستغرق دقيقة واحدة.",
      project: "الورش",
      projectPlaceholder: "اختاروا ورشًا",
      description: "الوصف",
      descriptionPlaceholder: "مثال: إسمنت ورمل للطابق الثاني",
      amount: "المبلغ ({currency})",
      date: "التاريخ",
      category: "الفئة",
      categoryPlaceholder: "اختاروا فئة",
      addSupplier: "+ إضافة مورد (اختياري)",
      supplier: "المورد",
      supplierOptional: "(اختياري)",
      supplierPlaceholder: "مثال: Ciments de l'Atlas",
      submit: "تسجيل المصروف",
      savedTitle: "تم تسجيل المصروف",
      savedDesc: "أصبح مُحتسبًا في لوحة التحكم الخاصة بكم.",
    },
    categories: {
      grosOeuvre: "الأشغال الكبرى",
      mainOeuvre: "اليد العاملة",
      materiaux: "المواد",
      lotsTechniques: "الأشغال التقنية",
      finitions: "التشطيبات",
      locationMateriel: "كراء المعدات",
      etudes: "الدراسات",
      administratif: "إداري",
      autre: "أخرى",
    },
  },
};

export type Dictionary = typeof dictionaries.fr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
