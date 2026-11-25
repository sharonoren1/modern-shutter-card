/**
 * Modern Shutter Card for Home Assistant
 * Repository: https://github.com/sharonoren1/modern-shutter-card
 * Author: Oren Sharon (sharonoren1)
 * License: MIT
 */

const CARD_VERSION = '1.1.0';
const SUPPORT_SET_TILT_POSITION = 128;

const DEFAULT_PRESETS = [
  { label: '0%', position: 0 },
  { label: '15%', position: 15 },
  { label: '50%', position: 50 },
  { label: '100%', position: 100 },
];

const RTL_LANGS = new Set(['he', 'ar', 'fa', 'ur']);

const TRANSLATIONS = {
  en: {
    open: 'Open',
    closed: 'Closed',
    opening: 'Opening...',
    closing: 'Closing...',
    unavailable: 'Unavailable',
    windowOpen: 'Window open',
    closeBlocked: 'Closing blocked — window is open',
    tilt: 'Tilt',
    up: 'Up',
    stop: 'Stop',
    down: 'Down',
    edGeneral: 'General Settings',
    edTitle: 'Card Title',
    edOptionalTitle: 'Optional title',
    edLanguage: 'Language',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Slats Color',
    edColorGray: 'Gray (Aluminum)',
    edColorWhite: 'White',
    edColorWood: 'Wood',
    edColorBlack: 'Black (Anthracite)',
    edCompact: 'Compact Mode (Side-by-Side)',
    edShowPresets: 'Show Quick Presets',
    edShowButtons: 'Show Up / Stop / Down',
    edShowPct: 'Show Percentage Badge',
    edInvertGlobal: 'Invert Position (Global)',
    edHaptic: 'Haptic Feedback',
    edShutters: 'Shutters',
    edShutter: 'Shutter',
    edRemove: 'Remove',
    edCoverEntity: 'Cover Entity',
    edCustomName: 'Custom Name (optional)',
    edFriendlyName: 'Friendly name',
    edWindowSensor: 'Window Sensor (optional)',
    edNone: '-- None --',
    edBlockClose: 'Block close if window open',
    edInvertEntity: 'Invert position',
    edAddShutter: '+ Add Shutter',
  },
  he: {
    open: 'פתוח',
    closed: 'סגור',
    opening: 'נפתח...',
    closing: 'נסגר...',
    unavailable: 'לא זמין',
    windowOpen: 'חלון פתוח',
    closeBlocked: 'הסגירה נחסמה — החלון פתוח',
    tilt: 'זווית',
    up: 'למעלה',
    stop: 'עצור',
    down: 'למטה',
    edGeneral: 'הגדרות כלליות',
    edTitle: 'כותרת הכרטיס',
    edOptionalTitle: 'כותרת אופציונלית',
    edLanguage: 'שפה',
    edAuto: 'אוטומטי (Home Assistant)',
    edSlatsColor: 'צבע שלבים',
    edColorGray: 'אפור (אלומיניום)',
    edColorWhite: 'לבן',
    edColorWood: 'עץ',
    edColorBlack: 'שחור (אנתרציט)',
    edCompact: 'מצב קומפקטי (זה לצד זה)',
    edShowPresets: 'הצג כפתורי מצבים מהירים',
    edShowButtons: 'הצג כפתורי למעלה / עצור / למטה',
    edShowPct: 'הצג אחוז פתיחה',
    edInvertGlobal: 'היפוך כיוון (גלובלי)',
    edHaptic: 'רטט במגע (Haptic)',
    edShutters: 'תריסים',
    edShutter: 'תריס',
    edRemove: 'הסר',
    edCoverEntity: 'ישות תריס (Cover)',
    edCustomName: 'שם מותאם אישית (אופציונלי)',
    edFriendlyName: 'שם תצוגה',
    edWindowSensor: 'חיישן חלון (אופציונלי)',
    edNone: '-- ללא --',
    edBlockClose: 'חסום סגירה כשהחלון פתוח',
    edInvertEntity: 'היפוך כיוון',
    edAddShutter: '+ הוסף תריס',
  },
  ar: {
    open: 'مفتوح',
    closed: 'مغلق',
    opening: 'جاري الفتح...',
    closing: 'جاري الإغلاق...',
    unavailable: 'غير متاح',
    windowOpen: 'النافذة مفتوحة',
    closeBlocked: 'تم منع الإغلاق — النافذة مفتوحة',
    tilt: 'الإمالة',
    up: 'أعلى',
    stop: 'إيقاف',
    down: 'أسفل',
    edGeneral: 'الإعدادات العامة',
    edTitle: 'عنوان البطاقة',
    edOptionalTitle: 'عنوان اختياري',
    edLanguage: 'اللغة',
    edAuto: 'تلقائي (Home Assistant)',
    edSlatsColor: 'لون الشرائح',
    edColorGray: 'رمادي (ألمنيوم)',
    edColorWhite: 'أبيض',
    edColorWood: 'خشبي',
    edColorBlack: 'أسود',
    edCompact: 'الوضع المدمج',
    edShowPresets: 'إظهار الأزرار السريعة',
    edShowButtons: 'إظهار أزرار أعلى / إيقاف / أسفل',
    edShowPct: 'إظهار نسبة الفتح',
    edInvertGlobal: 'عكس الاتجاه (عام)',
    edHaptic: 'اهتزاز اللمس',
    edShutters: 'الستائر',
    edShutter: 'ستارة',
    edRemove: 'حذف',
    edCoverEntity: 'كيان الستارة (Cover)',
    edCustomName: 'اسم مخصص (اختياري)',
    edFriendlyName: 'الاسم الظاهر',
    edWindowSensor: 'حساس النافذة (اختياري)',
    edNone: '-- بدون --',
    edBlockClose: 'منع الإغلاق عند فتح النافذة',
    edInvertEntity: 'عكس الاتجاه',
    edAddShutter: '+ إضافة ستارة',
  },
  ru: {
    open: 'Открыто',
    closed: 'Закрыто',
    opening: 'Открывается...',
    closing: 'Закрывается...',
    unavailable: 'Недоступно',
    windowOpen: 'Окно открыто',
    closeBlocked: 'Закрытие заблокировано — окно открыто',
    tilt: 'Наклон',
    up: 'Вверх',
    stop: 'Стоп',
    down: 'Вниз',
    edGeneral: 'Общие настройки',
    edTitle: 'Заголовок карточки',
    edOptionalTitle: 'Необязательный заголовок',
    edLanguage: 'Язык',
    edAuto: 'Авто (Home Assistant)',
    edSlatsColor: 'Цвет ламелей',
    edColorGray: 'Серый (Алюминий)',
    edColorWhite: 'Белый',
    edColorWood: 'Дерево',
    edColorBlack: 'Чёрный (Антрацит)',
    edCompact: 'Компактный режим',
    edShowPresets: 'Показать быстрые кнопки',
    edShowButtons: 'Показать Вверх / Стоп / Вниз',
    edShowPct: 'Показать проценты',
    edInvertGlobal: 'Инвертировать позицию',
    edHaptic: 'Виброотклик',
    edShutters: 'Жалюзи / Шторы',
    edShutter: 'Штора',
    edRemove: 'Удалить',
    edCoverEntity: 'Объект (Cover)',
    edCustomName: 'Имя (необязательно)',
    edFriendlyName: 'Отображаемое имя',
    edWindowSensor: 'Датчик окна (необязательно)',
    edNone: '-- Нет --',
    edBlockClose: 'Блокировать закрытие при открытом окне',
    edInvertEntity: 'Инвертировать позицию',
    edAddShutter: '+ Добавить штору',
  },
  fr: {
    open: 'Ouvert',
    closed: 'Fermé',
    opening: 'Ouverture...',
    closing: 'Fermeture...',
    unavailable: 'Indisponible',
    windowOpen: 'Fenêtre ouverte',
    closeBlocked: 'Fermeture bloquée — fenêtre ouverte',
    tilt: 'Inclinaison',
    up: 'Monter',
    stop: 'Arrêter',
    down: 'Descendre',
    edGeneral: 'Paramètres généraux',
    edTitle: 'Titre de la carte',
    edOptionalTitle: 'Titre optionnel',
    edLanguage: 'Langue',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Couleur des lames',
    edColorGray: 'Gris (Aluminium)',
    edColorWhite: 'Blanc',
    edColorWood: 'Bois',
    edColorBlack: 'Noir (Anthracite)',
    edCompact: 'Mode compact (côte à côte)',
    edShowPresets: 'Afficher les préréglages',
    edShowButtons: 'Afficher Monter / Stop / Descendre',
    edShowPct: 'Afficher le pourcentage',
    edInvertGlobal: 'Inverser la position (Global)',
    edHaptic: 'Retour haptique',
    edShutters: 'Volets',
    edShutter: 'Volet',
    edRemove: 'Supprimer',
    edCoverEntity: 'Entité volet (Cover)',
    edCustomName: 'Nom personnalisé (optionnel)',
    edFriendlyName: 'Nom affiché',
    edWindowSensor: 'Capteur de fenêtre (optionnel)',
    edNone: '-- Aucun --',
    edBlockClose: 'Bloquer la fermeture si fenêtre ouverte',
    edInvertEntity: 'Inverser la position',
    edAddShutter: '+ Ajouter un volet',
  },
  de: {
    open: 'Offen',
    closed: 'Geschlossen',
    opening: 'Öffnet...',
    closing: 'Schließt...',
    unavailable: 'Nicht verfügbar',
    windowOpen: 'Fenster offen',
    closeBlocked: 'Schließen blockiert — Fenster offen',
    tilt: 'Neigung',
    up: 'Hoch',
    stop: 'Stopp',
    down: 'Runter',
    edGeneral: 'Allgemeine Einstellungen',
    edTitle: 'Kartentitel',
    edOptionalTitle: 'Optionaler Titel',
    edLanguage: 'Sprache',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Lamellenfarbe',
    edColorGray: 'Grau (Aluminium)',
    edColorWhite: 'Weiß',
    edColorWood: 'Holz',
    edColorBlack: 'Schwarz (Anthrazit)',
    edCompact: 'Kompaktmodus (Nebeneinander)',
    edShowPresets: 'Schnellwahl-Buttons anzeigen',
    edShowButtons: 'Hoch / Stopp / Runter anzeigen',
    edShowPct: 'Prozentanzeige anzeigen',
    edInvertGlobal: 'Position invertieren (Global)',
    edHaptic: 'Haptisches Feedback',
    edShutters: 'Rollläden',
    edShutter: 'Rollladen',
    edRemove: 'Entfernen',
    edCoverEntity: 'Cover-Entität',
    edCustomName: 'Eigener Name (optional)',
    edFriendlyName: 'Anzeigename',
    edWindowSensor: 'Fenstersensor (optional)',
    edNone: '-- Keiner --',
    edBlockClose: 'Schließen bei offenem Fenster blockieren',
    edInvertEntity: 'Position invertieren',
    edAddShutter: '+ Rollladen hinzufügen',
  },
  es: {
    open: 'Abierto',
    closed: 'Cerrado',
    opening: 'Abriendo...',
    closing: 'Cerrando...',
    unavailable: 'No disponible',
    windowOpen: 'Ventana abierta',
    closeBlocked: 'Cierre bloqueado — ventana abierta',
    tilt: 'Inclinación',
    up: 'Subir',
    stop: 'Parar',
    down: 'Bajar',
    edGeneral: 'Ajustes generales',
    edTitle: 'Título de la tarjeta',
    edOptionalTitle: 'Título opcional',
    edLanguage: 'Idioma',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Color de lamas',
    edColorGray: 'Gris (Aluminio)',
    edColorWhite: 'Blanco',
    edColorWood: 'Madera',
    edColorBlack: 'Negro (Antracita)',
    edCompact: 'Modo compacto',
    edShowPresets: 'Mostrar accesos rápidos',
    edShowButtons: 'Mostrar Subir / Parar / Bajar',
    edShowPct: 'Mostrar porcentaje',
    edInvertGlobal: 'Invertir posición (Global)',
    edHaptic: 'Respuesta háptica',
    edShutters: 'Persianas',
    edShutter: 'Persiana',
    edRemove: 'Eliminar',
    edCoverEntity: 'Entidad (Cover)',
    edCustomName: 'Nombre personalizado (opcional)',
    edFriendlyName: 'Nombre visible',
    edWindowSensor: 'Sensor de ventana (opcional)',
    edNone: '-- Ninguno --',
    edBlockClose: 'Bloquear cierre si la ventana está abierta',
    edInvertEntity: 'Invertir posición',
    edAddShutter: '+ Añadir persiana',
  },
  it: {
    open: 'Aperto',
    closed: 'Chiuso',
    opening: 'Apertura...',
    closing: 'Chiusura...',
    unavailable: 'Non disponibile',
    windowOpen: 'Finestra aperta',
    closeBlocked: 'Chiusura bloccata — finestra aperta',
    tilt: 'Inclinazione',
    up: 'Su',
    stop: 'Stop',
    down: 'Giù',
    edGeneral: 'Impostazioni generali',
    edTitle: 'Titolo scheda',
    edOptionalTitle: 'Titolo opzionale',
    edLanguage: 'Lingua',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Colore lamelle',
    edColorGray: 'Grigio (Alluminio)',
    edColorWhite: 'Bianco',
    edColorWood: 'Legno',
    edColorBlack: 'Nero (Antracite)',
    edCompact: 'Modalità compatta',
    edShowPresets: 'Mostra preset rapidi',
    edShowButtons: 'Mostra Su / Stop / Giù',
    edShowPct: 'Mostra percentuale',
    edInvertGlobal: 'Inverti posizione (Globale)',
    edHaptic: 'Feedback aptico',
    edShutters: 'Tapparelle',
    edShutter: 'Tapparella',
    edRemove: 'Rimuovi',
    edCoverEntity: 'Entità (Cover)',
    edCustomName: 'Nome personalizzato (opzionale)',
    edFriendlyName: 'Nome visualizzato',
    edWindowSensor: 'Sensore finestra (opzionale)',
    edNone: '-- Nessuno --',
    edBlockClose: 'Blocca chiusura se finestra aperta',
    edInvertEntity: 'Inverti posizione',
    edAddShutter: '+ Aggiungi tapparella',
  },
  nl: {
    open: 'Open',
    closed: 'Dicht',
    opening: 'Openen...',
    closing: 'Sluiten...',
    unavailable: 'Niet beschikbaar',
    windowOpen: 'Raam open',
    closeBlocked: 'Sluiten geblokkeerd — raam is open',
    tilt: 'Kantelen',
    up: 'Omhoog',
    stop: 'Stop',
    down: 'Omlaag',
    edGeneral: 'Algemene instellingen',
    edTitle: 'Kaarttitel',
    edOptionalTitle: 'Optionele titel',
    edLanguage: 'Taal',
    edAuto: 'Auto (Home Assistant)',
    edSlatsColor: 'Kleur lamellen',
    edColorGray: 'Grijs (Aluminium)',
    edColorWhite: 'Wit',
    edColorWood: 'Hout',
    edColorBlack: 'Zwart (Antraciet)',
    edCompact: 'Compacte weergave',
    edShowPresets: 'Snelle knoppen tonen',
    edShowButtons: 'Omhoog / Stop / Omlaag tonen',
    edShowPct: 'Percentage tonen',
    edInvertGlobal: 'Positie omkeren (Globaal)',
    edHaptic: 'Haptische feedback',
    edShutters: 'Rolluiken',
    edShutter: 'Rolluik',
    edRemove: 'Verwijderen',
    edCoverEntity: 'Cover-entiteit',
    edCustomName: 'Eigen naam (optioneel)',
    edFriendlyName: 'Weergavenaam',
    edWindowSensor: 'Raamsensor (optioneel)',
    edNone: '-- Geen --',
    edBlockClose: 'Sluiten blokkeren bij open raam',
    edInvertEntity: 'Positie omkeren',
    edAddShutter: '+ Rolluik toevoegen',
  },
};

const LANGUAGE_OPTIONS = [
  { code: 'auto', label: null },
  { code: 'en', label: 'English' },
  { code: 'he', label: 'עברית (Hebrew)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'it', label: 'Italiano (Italian)' },
  { code: 'nl', label: 'Nederlands (Dutch)' },
];

const SLAT_THEMES = {
  gray: {
    base: '#9aa4b2',
    light: '#c7cfd9',
    dark: '#6c7685',
    bar: '#5c6675',
  },
  white: {
    base: '#eef1f5',
    light: '#ffffff',
    dark: '#cfd6df',
    bar: '#bfc7d1',
  },
  wood: {
    base: '#a6754b',
    light: '#c8986d',
    dark: '#754d2d',
    bar: '#5e3c22',
  },
  black: {
    base: '#2e333b',
    light: '#444b57',
    dark: '#191c21',
    bar: '#111317',
  },
};

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveLang(configLang, hass) {
  if (configLang && configLang !== 'auto') {
    const base = String(configLang).toLowerCase().split(/[-_]/)[0];
    if (TRANSLATIONS[base]) return base;
  }
  const haLang = (hass?.language || hass?.locale?.language || document.documentElement.lang || 'en')
    .toLowerCase()
    .split(/[-_]/)[0];
  return TRANSLATIONS[haLang] ? haLang : 'en';
}

function t(lang, key) {
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

function fireEvent(node, type, detail = {}, options = {}) {
  const event = new CustomEvent(type, {
    bubbles: options.bubbles !== undefined ? options.bubbles : true,
    cancelable: Boolean(options.cancelable),
    composed: options.composed !== undefined ? options.composed : true,
    detail,
  });
  node.dispatchEvent(event);
  return event;
}

function triggerHaptic(node, enabled, type = 'selection') {
  if (!enabled) return;
  try {
    fireEvent(node, 'haptic', type);
    if (navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(type === 'failure' ? [25, 30, 25] : 10);
    }
  } catch (_) {
    // Ignore haptic errors on unsupported browsers
  }
}

function getSlatColors(colorKey) {
  if (!colorKey) return SLAT_THEMES.gray;
  const key = String(colorKey).toLowerCase().trim();
  if (SLAT_THEMES[key]) return SLAT_THEMES[key];
  return {
    base: colorKey,
    light: `color-mix(in srgb, ${colorKey} 78%, white)`,
    dark: `color-mix(in srgb, ${colorKey} 72%, black)`,
    bar: `color-mix(in srgb, ${colorKey} 60%, black)`,
  };
}

class ModernShutterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
    this._hass = null;
    this._dragging = null;
    this._toastTimers = new Map();
    this._rendered = false;
    this._lastLang = null;
    this._lastRtl = null;
  }

  static getConfigElement() {
    return document.createElement('modern-shutter-card-editor');
  }

  static getStubConfig(hass) {
    let defaultEntity = 'cover.living_room_shutter';
    if (hass && hass.states) {
      const firstCover = Object.keys(hass.states).find((id) => id.startsWith('cover.'));
      if (firstCover) defaultEntity = firstCover;
    }
    return {
      title: '',
      language: 'auto',
      compact: false,
      slats_color: 'gray',
      show_presets: true,
      show_buttons: true,
      show_percentage: true,
      show_tilt: 'auto',
      invert_position: false,
      haptic: true,
      rtl: 'auto',
      presets: DEFAULT_PRESETS,
      entities: [
        {
          entity: defaultEntity,
        },
      ],
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration for Modern Shutter Card.');
    }

    let rawEntities = [];
    if (Array.isArray(config.entities) && config.entities.length > 0) {
      rawEntities = config.entities;
    } else if (typeof config.entity === 'string' && config.entity.trim()) {
      rawEntities = [{ entity: config.entity.trim() }];
    } else {
      throw new Error('Please define at least one cover entity in "entities" or "entity".');
    }

    const entities = rawEntities.map((item) => {
      if (typeof item === 'string') {
        return { entity: item };
      }
      if (!item || typeof item.entity !== 'string' || !item.entity.trim()) {
        throw new Error('Each item in "entities" must specify a valid "entity" ID.');
      }
      return { ...item };
    });

    this._config = {
      title: config.title || '',
      language: config.language || 'auto',
      compact: Boolean(config.compact),
      slats_color: config.slats_color || 'gray',
      show_presets: config.show_presets !== false,
      presets:
        Array.isArray(config.presets) && config.presets.length > 0
          ? config.presets
          : DEFAULT_PRESETS,
      show_buttons: config.show_buttons !== false,
      show_percentage: config.show_percentage !== false,
      show_tilt: config.show_tilt !== undefined ? config.show_tilt : 'auto',
      invert_position: Boolean(config.invert_position),
      haptic: config.haptic !== false,
      rtl: config.rtl !== undefined ? config.rtl : 'auto',
      entities,
    };

    this._rendered = false;
    this._renderStructure();
    if (this._hass) {
      this._updateAllStates();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const currentLang = this._getLang();
    const currentRtl = this._isRtl();
    if (!this._rendered || currentLang !== this._lastLang || currentRtl !== this._lastRtl) {
      this._renderStructure();
    }
    this._updateAllStates();
  }

  getCardSize() {
    const count = this._config?.entities?.length || 1;
    if (this._config?.compact) {
      return 5;
    }
    return Math.max(4, count * 4 + (this._config?.title ? 1 : 0));
  }

  getGridOptions() {
    const count = this._config?.entities?.length || 1;
    if (this._config?.compact) {
      return {
        columns: 12,
        min_columns: 6,
        rows: 5,
        min_rows: 4,
      };
    }
    return {
      columns: 6,
      min_columns: 4,
      rows: Math.max(5, count * 5),
      min_rows: 4,
    };
  }

  _getLang() {
    return resolveLang(this._config?.language, this._hass);
  }

  _isRtl() {
    if (this._config?.rtl === true) return true;
    if (this._config?.rtl === false) return false;
    const lang = this._getLang();
    if (RTL_LANGS.has(lang)) return true;
    if (this._config?.language && this._config.language !== 'auto') return false;
    const docDir = document.documentElement.dir || document.body.dir || '';
    return docDir === 'rtl';
  }

  _text(key) {
    return t(this._getLang(), key);
  }

  _getEntityConfig(index) {
    return this._config.entities[index];
  }

  _getOpenness(index) {
    const item = this._getEntityConfig(index);
    const stateObj = this._hass?.states?.[item.entity];
    const invert =
      item.invert_position !== undefined
        ? Boolean(item.invert_position)
        : this._config.invert_position;

    if (!stateObj) {
      return { openness: 100, available: false, state: 'unavailable', rawPos: null, invert };
    }

    const available = stateObj.state !== 'unavailable' && stateObj.state !== 'unknown';
    let rawPos = stateObj.attributes?.current_position;

    if (rawPos === undefined || rawPos === null || Number.isNaN(Number(rawPos))) {
      rawPos = stateObj.state === 'closed' ? 0 : 100;
    } else {
      rawPos = clamp(Math.round(Number(rawPos)), 0, 100);
    }

    const openness = invert ? 100 - rawPos : rawPos;
    return {
      openness,
      available,
      state: stateObj.state,
      rawPos,
      invert,
      stateObj,
    };
  }

  _isWindowOpen(item) {
    if (!item.window_sensor || !this._hass?.states) return false;
    const sensor = this._hass.states[item.window_sensor];
    if (!sensor) return false;
    return sensor.state === 'on' || sensor.state === 'open';
  }

  _shouldBlockClose(item, targetOpenness, currentOpenness) {
    if (!item.block_close_if_open) return false;
    if (!this._isWindowOpen(item)) return false;
    return targetOpenness < currentOpenness;
  }

  _showBlockedWarning(index) {
    triggerHaptic(this, this._config.haptic, 'failure');
    const tile = this.shadowRoot.querySelector(`.shutter-tile[data-index="${index}"]`);
    if (!tile) return;
    const toast = tile.querySelector('.blocked-toast');
    const win = tile.querySelector('.window-frame');
    if (win) {
      win.classList.remove('shake');
      void win.offsetWidth;
      win.classList.add('shake');
    }
    if (toast) {
      toast.textContent = this._text('closeBlocked');
      toast.classList.add('visible');
      if (this._toastTimers.has(index)) {
        clearTimeout(this._toastTimers.get(index));
      }
      this._toastTimers.set(
        index,
        setTimeout(() => {
          toast.classList.remove('visible');
        }, 2600)
      );
    }
  }

  _setPosition(index, targetOpenness) {
    const item = this._getEntityConfig(index);
    const info = this._getOpenness(index);
    if (!info.available) return;

    const clampedOpenness = clamp(Math.round(targetOpenness), 0, 100);
    if (this._shouldBlockClose(item, clampedOpenness, info.openness)) {
      this._showBlockedWarning(index);
      return;
    }

    const rawTarget = info.invert ? 100 - clampedOpenness : clampedOpenness;
    triggerHaptic(this, this._config.haptic, 'selection');
    this._hass.callService('cover', 'set_cover_position', {
      entity_id: item.entity,
      position: rawTarget,
    });
  }

  _callCoverAction(index, action) {
    const item = this._getEntityConfig(index);
    const info = this._getOpenness(index);
    if (!info.available) return;

    if (action === 'down' && this._shouldBlockClose(item, 0, info.openness)) {
      this._showBlockedWarning(index);
      return;
    }

    let service = 'stop_cover';
    if (action === 'up') {
      service = info.invert ? 'close_cover' : 'open_cover';
    } else if (action === 'down') {
      service = info.invert ? 'open_cover' : 'close_cover';
    }

    triggerHaptic(this, this._config.haptic, 'light');
    this._hass.callService('cover', service, {
      entity_id: item.entity,
    });
  }

  _setTilt(index, tiltValue) {
    const item = this._getEntityConfig(index);
    triggerHaptic(this, this._config.haptic, 'selection');
    this._hass.callService('cover', 'set_cover_tilt_position', {
      entity_id: item.entity,
      tilt_position: clamp(Math.round(tiltValue), 0, 100),
    });
  }

  _openMoreInfo(entityId) {
    fireEvent(this, 'hass-more-info', { entityId });
  }

  _renderStructure() {
    if (!this._config) return;
    const lang = this._getLang();
    const isRtl = this._isRtl();
    this._lastLang = lang;
    this._lastRtl = isRtl;
    const compact = this._config.compact;

    const tilesHtml = this._config.entities
      .map((item, idx) => {
        const colors = getSlatColors(item.slats_color || this._config.slats_color);
        const presetsHtml = this._config.show_presets
          ? `<div class="presets-row">
              ${this._config.presets
                .map(
                  (p) => `
                <button
                  type="button"
                  class="preset-btn"
                  data-index="${idx}"
                  data-pos="${clamp(Number(p.position) || 0, 0, 100)}"
                  title="${escapeHtml(p.label)} (${clamp(Number(p.position) || 0, 0, 100)}%)"
                >${escapeHtml(p.label)}</button>`
                )
                .join('')}
            </div>`
          : '';

        const buttonsHtml = this._config.show_buttons
          ? `<div class="controls-col">
              <button type="button" class="ctrl-btn" data-action="up" data-index="${idx}" aria-label="${escapeHtml(t(lang, 'up'))}" title="${escapeHtml(t(lang, 'up'))}">
                <svg viewBox="0 0 24 24"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
              </button>
              <button type="button" class="ctrl-btn stop-btn" data-action="stop" data-index="${idx}" aria-label="${escapeHtml(t(lang, 'stop'))}" title="${escapeHtml(t(lang, 'stop'))}">
                <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
              </button>
              <button type="button" class="ctrl-btn" data-action="down" data-index="${idx}" aria-label="${escapeHtml(t(lang, 'down'))}" title="${escapeHtml(t(lang, 'down'))}">
                <svg viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
              </button>
            </div>`
          : '';

        return `
          <div
            class="shutter-tile"
            data-index="${idx}"
            style="
              --slat-base: ${colors.base};
              --slat-light: ${colors.light};
              --slat-dark: ${colors.dark};
              --slat-bar: ${colors.bar};
            "
          >
            <div class="tile-header">
              <button type="button" class="entity-title" data-more-info="${escapeHtml(item.entity)}">
                <span class="name-text">${escapeHtml(item.name || item.entity)}</span>
              </button>
              <span class="state-pill"></span>
            </div>

            <div class="shutter-stage">
              ${buttonsHtml}
              <div class="window-wrapper">
                <div class="window-frame" data-index="${idx}" role="slider" aria-valuemin="0" aria-valuemax="100" tabindex="0">
                  <div class="window-sky">
                    <div class="window-cross-v"></div>
                    <div class="window-cross-h"></div>
                    <div class="window-glare"></div>
                  </div>
                  <div class="shutter-curtain">
                    <div class="shutter-slats"></div>
                    <div class="shutter-bottom-bar">
                      <span class="drag-pill"></span>
                    </div>
                  </div>
                  <div class="window-pelmet"></div>
                  ${this._config.show_percentage ? '<div class="pct-badge">100%</div>' : ''}
                  <div class="motion-badge" aria-hidden="true"></div>
                  <div class="window-sensor-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    <span class="sensor-label"></span>
                  </div>
                  <div class="blocked-toast" role="alert"></div>
                </div>
              </div>
            </div>

            <div class="tilt-row" data-index="${idx}" style="display:none;">
              <span class="tilt-label">
                <svg viewBox="0 0 24 24"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>
                <span class="tilt-text">${escapeHtml(t(lang, 'tilt'))}</span>
              </span>
              <input type="range" class="tilt-slider" min="0" max="100" value="50" data-index="${idx}" />
              <span class="tilt-val">50%</span>
            </div>

            ${presetsHtml}
          </div>
        `;
      })
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --msc-radius: var(--ha-card-border-radius, 14px);
          --msc-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
          --msc-text: var(--primary-text-color, #1f2937);
          --msc-subtext: var(--secondary-text-color, #6b7280);
          --msc-primary: var(--primary-color, #03a9f4);
          --msc-divider: var(--divider-color, rgba(128, 128, 128, 0.2));
        }

        ha-card {
          background: var(--msc-bg);
          border-radius: var(--msc-radius);
          padding: 14px;
          color: var(--msc-text);
          box-sizing: border-box;
          overflow: hidden;
        }

        .card-header-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: var(--msc-text);
          letter-spacing: -0.01em;
        }

        .shutters-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .shutters-container.compact {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .shutter-tile {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(127, 127, 127, 0.05);
          border: 1px solid var(--msc-divider);
          transition: opacity 0.2s ease;
        }

        .shutter-tile.unavailable {
          opacity: 0.55;
        }

        .tile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .entity-title {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--msc-text);
          cursor: pointer;
          text-align: start;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .entity-title:hover {
          color: var(--msc-primary);
        }

        .state-pill {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--msc-subtext);
          background: rgba(127, 127, 127, 0.12);
          padding: 2px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .state-pill.moving {
          color: var(--msc-primary);
          background: color-mix(in srgb, var(--msc-primary) 15%, transparent);
        }

        .shutter-stage {
          display: flex;
          align-items: stretch;
          gap: 10px;
        }

        .shutters-container.compact .shutter-stage {
          gap: 6px;
        }

        .controls-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 6px;
        }

        .ctrl-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--msc-divider);
          background: var(--msc-bg);
          color: var(--msc-text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: background 0.15s ease, transform 0.1s ease, border-color 0.15s ease;
        }

        .shutters-container.compact .ctrl-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }

        .ctrl-btn:hover {
          border-color: var(--msc-primary);
          color: var(--msc-primary);
        }

        .ctrl-btn:active {
          transform: scale(0.93);
        }

        .ctrl-btn svg {
          width: 22px;
          height: 22px;
          fill: currentColor;
        }

        .ctrl-btn.stop-btn svg {
          width: 15px;
          height: 15px;
        }

        .window-wrapper {
          flex: 1;
          min-width: 0;
        }

        .window-frame {
          position: relative;
          width: 100%;
          height: 144px;
          border-radius: 10px;
          overflow: hidden;
          border: 3px solid color-mix(in srgb, var(--msc-text) 18%, transparent);
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.16);
          cursor: ns-resize;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          box-sizing: border-box;
        }

        .shutters-container.compact .window-frame {
          height: 120px;
        }

        .window-sky {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #7cc4fa 0%, #c6e6fd 58%, #eef7ff 100%);
        }

        @media (prefers-color-scheme: dark) {
          .window-sky {
            background: linear-gradient(180deg, #1d3557 0%, #3a5a82 60%, #5c7fa3 100%);
          }
        }

        .window-cross-v {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 3px;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.42);
        }

        .window-cross-h {
          position: absolute;
          left: 0;
          right: 0;
          top: 52%;
          height: 3px;
          background: rgba(255, 255, 255, 0.42);
        }

        .window-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 45%);
          pointer-events: none;
        }

        .window-pelmet {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: var(--slat-bar);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          z-index: 4;
          pointer-events: none;
        }

        .shutter-curtain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 10%;
          min-height: 16px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
          will-change: height;
        }

        .shutter-curtain.dragging {
          transition: none;
        }

        .shutter-slats {
          flex: 1;
          width: 100%;
          background: repeating-linear-gradient(
            180deg,
            var(--slat-light) 0px,
            var(--slat-base) 2px,
            var(--slat-base) 9px,
            var(--slat-dark) 11px,
            rgba(0, 0, 0, 0.35) 12px
          );
        }

        .shutter-bottom-bar {
          height: 11px;
          background: linear-gradient(180deg, var(--slat-base) 0%, var(--slat-bar) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .drag-pill {
          width: 28px;
          height: 3px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.7);
        }

        .pct-badge {
          position: absolute;
          bottom: 7px;
          inset-inline-end: 7px;
          z-index: 5;
          font-size: 0.76rem;
          font-weight: 700;
          color: #ffffff;
          background: rgba(15, 23, 42, 0.68);
          backdrop-filter: blur(4px);
          padding: 2px 7px;
          border-radius: 999px;
          pointer-events: none;
          font-variant-numeric: tabular-nums;
        }

        .motion-badge {
          position: absolute;
          top: 12px;
          inset-inline-end: 7px;
          z-index: 5;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--msc-primary);
          color: #ffffff;
          display: none;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          pointer-events: none;
        }

        .motion-badge.visible {
          display: flex;
          animation: msc-pulse 1.1s infinite ease-in-out;
        }

        .motion-badge svg {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .window-sensor-badge {
          position: absolute;
          bottom: 7px;
          inset-inline-start: 7px;
          z-index: 5;
          display: none;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #ffffff;
          background: rgba(217, 119, 6, 0.92);
          padding: 2px 8px;
          border-radius: 999px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          pointer-events: none;
        }

        .window-sensor-badge.visible {
          display: inline-flex;
        }

        .window-sensor-badge svg {
          width: 13px;
          height: 13px;
          fill: currentColor;
        }

        .blocked-toast {
          position: absolute;
          inset-inline: 8px;
          top: 50%;
          transform: translateY(-50%) scale(0.95);
          z-index: 6;
          background: rgba(220, 38, 38, 0.94);
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 600;
          text-align: center;
          padding: 6px 10px;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .blocked-toast.visible {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }

        .tilt-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 2px;
        }

        .tilt-label {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.76rem;
          color: var(--msc-subtext);
          white-space: nowrap;
        }

        .tilt-label svg {
          width: 15px;
          height: 15px;
          fill: currentColor;
        }

        .tilt-slider {
          flex: 1;
          accent-color: var(--msc-primary);
          cursor: pointer;
          margin: 0;
        }

        .tilt-val {
          font-size: 0.74rem;
          color: var(--msc-subtext);
          min-width: 30px;
          text-align: end;
          font-variant-numeric: tabular-nums;
        }

        .presets-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(46px, 1fr));
          gap: 6px;
        }

        .preset-btn {
          border: 1px solid var(--msc-divider);
          background: var(--msc-bg);
          color: var(--msc-text);
          border-radius: 8px;
          padding: 5px 4px;
          font: inherit;
          font-size: 0.76rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preset-btn:hover {
          border-color: var(--msc-primary);
        }

        .preset-btn.active {
          background: var(--msc-primary);
          border-color: var(--msc-primary);
          color: #ffffff;
          font-weight: 600;
        }

        .window-frame.shake {
          animation: msc-shake 0.35s ease;
        }

        @keyframes msc-pulse {
          0%, 100% { transform: translateY(0); opacity: 0.95; }
          50% { transform: translateY(-2px); opacity: 0.65; }
        }

        @keyframes msc-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-4px); }
        }
      </style>

      <ha-card dir="${isRtl ? 'rtl' : 'ltr'}">
        ${this._config.title ? `<div class="card-header-title">${escapeHtml(this._config.title)}</div>` : ''}
        <div class="shutters-container ${compact ? 'compact' : ''}">
          ${tilesHtml}
        </div>
      </ha-card>
    `;

    this._bindEvents();
    this._rendered = true;
  }

  _bindEvents() {
    this.shadowRoot.querySelectorAll('.entity-title').forEach((btn) => {
      btn.addEventListener('click', () => {
        this._openMoreInfo(btn.dataset.moreInfo);
      });
    });

    this.shadowRoot.querySelectorAll('.ctrl-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        this._callCoverAction(index, btn.dataset.action);
      });
    });

    this.shadowRoot.querySelectorAll('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        const pos = Number(btn.dataset.pos);
        this._setPosition(index, pos);
      });
    });

    this.shadowRoot.querySelectorAll('.tilt-slider').forEach((slider) => {
      slider.addEventListener('input', (e) => {
        const row = e.target.closest('.tilt-row');
        const valEl = row?.querySelector('.tilt-val');
        if (valEl) valEl.textContent = `${e.target.value}%`;
      });
      slider.addEventListener('change', (e) => {
        const index = Number(e.target.dataset.index);
        this._setTilt(index, Number(e.target.value));
      });
    });

    this.shadowRoot.querySelectorAll('.window-frame').forEach((frame) => {
      const index = Number(frame.dataset.index);

      const calcOpennessFromPointer = (clientY, rect) => {
        const relY = clamp((clientY - rect.top) / rect.height, 0, 1);
        return Math.round((1 - relY) * 100);
      };

      frame.addEventListener('pointerdown', (e) => {
        const info = this._getOpenness(index);
        if (!info.available) return;
        e.preventDefault();
        frame.setPointerCapture(e.pointerId);
        const rect = frame.getBoundingClientRect();
        const openness = calcOpennessFromPointer(e.clientY, rect);

        this._dragging = { index, rect, openness };
        const curtain = frame.querySelector('.shutter-curtain');
        curtain?.classList.add('dragging');
        this._applyVisualOpenness(index, openness);
      });

      frame.addEventListener('pointermove', (e) => {
        if (!this._dragging || this._dragging.index !== index) return;
        e.preventDefault();
        const openness = calcOpennessFromPointer(e.clientY, this._dragging.rect);
        if (openness !== this._dragging.openness) {
          this._dragging.openness = openness;
          this._applyVisualOpenness(index, openness);
        }
      });

      const finishDrag = (e) => {
        if (!this._dragging || this._dragging.index !== index) return;
        const targetOpenness = this._dragging.openness;
        this._dragging = null;
        const curtain = frame.querySelector('.shutter-curtain');
        curtain?.classList.remove('dragging');
        try {
          if (frame.hasPointerCapture(e.pointerId)) {
            frame.releasePointerCapture(e.pointerId);
          }
        } catch (_) {
          // Ignore
        }
        this._setPosition(index, targetOpenness);
        this._updateSingleState(index);
      };

      frame.addEventListener('pointerup', finishDrag);
      frame.addEventListener('pointercancel', finishDrag);

      frame.addEventListener('keydown', (e) => {
        const info = this._getOpenness(index);
        if (!info.available) return;
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this._setPosition(index, info.openness + 10);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this._setPosition(index, info.openness - 10);
        }
      });
    });
  }

  _applyVisualOpenness(index, openness) {
    const tile = this.shadowRoot.querySelector(`.shutter-tile[data-index="${index}"]`);
    if (!tile) return;
    const coveredPct = clamp(100 - openness, 0, 100);
    const curtain = tile.querySelector('.shutter-curtain');
    if (curtain) {
      curtain.style.height = `${coveredPct}%`;
    }
    const pctBadge = tile.querySelector('.pct-badge');
    if (pctBadge) {
      pctBadge.textContent = `${openness}%`;
    }
    const frame = tile.querySelector('.window-frame');
    if (frame) {
      frame.setAttribute('aria-valuenow', String(openness));
    }
  }

  _updateAllStates() {
    if (!this._config || !this._hass) return;
    this._config.entities.forEach((_, idx) => this._updateSingleState(idx));
  }

  _updateSingleState(index) {
    const tile = this.shadowRoot.querySelector(`.shutter-tile[data-index="${index}"]`);
    if (!tile) return;

    const item = this._getEntityConfig(index);
    const info = this._getOpenness(index);
    const stateObj = info.stateObj;

    tile.classList.toggle('unavailable', !info.available);

    const nameEl = tile.querySelector('.name-text');
    if (nameEl) {
      const displayName = item.name || stateObj?.attributes?.friendly_name || item.entity;
      nameEl.textContent = displayName;
    }

    if (!this._dragging || this._dragging.index !== index) {
      this._applyVisualOpenness(index, info.openness);
    }

    const statePill = tile.querySelector('.state-pill');
    const motionBadge = tile.querySelector('.motion-badge');
    const isOpening = info.state === 'opening';
    const isClosing = info.state === 'closing';

    if (statePill) {
      statePill.classList.toggle('moving', isOpening || isClosing);
      if (!info.available) {
        statePill.textContent = this._text('unavailable');
      } else if (isOpening) {
        statePill.textContent = this._text('opening');
      } else if (isClosing) {
        statePill.textContent = this._text('closing');
      } else if (info.openness === 0) {
        statePill.textContent = this._text('closed');
      } else if (info.openness === 100) {
        statePill.textContent = this._text('open');
      } else {
        statePill.textContent = `${info.openness}%`;
      }
    }

    if (motionBadge) {
      if (isOpening || isClosing) {
        motionBadge.classList.add('visible');
        const showUpArrow = info.invert ? isClosing : isOpening;
        motionBadge.innerHTML = showUpArrow
          ? '<svg viewBox="0 0 24 24"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>';
      } else {
        motionBadge.classList.remove('visible');
      }
    }

    tile.querySelectorAll('.preset-btn').forEach((btn) => {
      const pos = Number(btn.dataset.pos);
      btn.classList.toggle('active', info.available && Math.abs(info.openness - pos) <= 2);
    });

    const sensorBadge = tile.querySelector('.window-sensor-badge');
    if (sensorBadge) {
      const winOpen = this._isWindowOpen(item);
      sensorBadge.classList.toggle('visible', winOpen);
      const label = sensorBadge.querySelector('.sensor-label');
      if (label) label.textContent = this._text('windowOpen');
    }

    const tiltRow = tile.querySelector('.tilt-row');
    if (tiltRow && stateObj) {
      const features = Number(stateObj.attributes?.supported_features || 0);
      const hasTiltAttr = stateObj.attributes?.current_tilt_position !== undefined;
      const supportsTilt = (features & SUPPORT_SET_TILT_POSITION) !== 0 || hasTiltAttr;
      const shouldShowTilt =
        this._config.show_tilt === true || (this._config.show_tilt === 'auto' && supportsTilt);

      tiltRow.style.display = shouldShowTilt ? 'flex' : 'none';
      if (shouldShowTilt) {
        const tiltPos = clamp(
          Math.round(Number(stateObj.attributes?.current_tilt_position ?? 50)),
          0,
          100
        );
        const slider = tiltRow.querySelector('.tilt-slider');
        const valEl = tiltRow.querySelector('.tilt-val');
        if (slider && document.activeElement !== slider) {
          slider.value = String(tiltPos);
        }
        if (valEl) valEl.textContent = `${tiltPos}%`;
      }
    }
  }
}

/* =========================================================================
 * Built-in Multi-Language Visual Editor for Home Assistant UI
 * ========================================================================= */
class ModernShutterCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
  }

  setConfig(config) {
    this._config = {
      title: '',
      language: 'auto',
      compact: false,
      slats_color: 'gray',
      show_presets: true,
      show_buttons: true,
      show_percentage: true,
      show_tilt: 'auto',
      invert_position: false,
      haptic: true,
      rtl: 'auto',
      presets: DEFAULT_PRESETS,
      ...config,
    };

    if (!Array.isArray(this._config.entities)) {
      this._config.entities = this._config.entity ? [{ entity: this._config.entity }] : [];
    } else {
      this._config.entities = this._config.entities.map((e) =>
        typeof e === 'string' ? { entity: e } : { ...e }
      );
    }

    this._render();
  }

  set hass(hass) {
    const firstHass = !this._hass;
    this._hass = hass;
    if (firstHass) {
      this._render();
    }
  }

  _emitConfig() {
    const clean = { ...this._config };
    delete clean.entity;
    fireEvent(this, 'config-changed', { config: clean });
  }

  _getEntitiesByDomain(domain) {
    if (!this._hass?.states) return [];
    return Object.keys(this._hass.states)
      .filter((id) => id.startsWith(`${domain}.`))
      .sort();
  }

  _render() {
    const lang = resolveLang(this._config.language, this._hass);
    const isRtl = RTL_LANGS.has(lang);
    const tr = (key) => t(lang, key);

    const covers = this._getEntitiesByDomain('cover');
    const binarySensors = this._getEntitiesByDomain('binary_sensor');

    const langOptionsHtml = LANGUAGE_OPTIONS.map((opt) => {
      const label = opt.code === 'auto' ? tr('edAuto') : opt.label;
      return `<option value="${opt.code}" ${(this._config.language || 'auto') === opt.code ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    const entitiesHtml = (this._config.entities || [])
      .map((item, idx) => {
        const coverOptions = covers
          .map(
            (id) =>
              `<option value="${escapeHtml(id)}" ${item.entity === id ? 'selected' : ''}>${escapeHtml(
                this._hass?.states?.[id]?.attributes?.friendly_name || id
              )} (${escapeHtml(id)})</option>`
          )
          .join('');

        const sensorOptions = [
          `<option value="">${escapeHtml(tr('edNone'))}</option>`,
          ...binarySensors.map(
            (id) =>
              `<option value="${escapeHtml(id)}" ${item.window_sensor === id ? 'selected' : ''}>${escapeHtml(
                this._hass?.states?.[id]?.attributes?.friendly_name || id
              )} (${escapeHtml(id)})</option>`
          ),
        ].join('');

        return `
          <div class="entity-box" data-idx="${idx}">
            <div class="entity-box-header">
              <strong>${escapeHtml(tr('edShutter'))} #${idx + 1}</strong>
              <button type="button" class="remove-btn" data-remove="${idx}">${escapeHtml(tr('edRemove'))}</button>
            </div>
            <label>
              ${escapeHtml(tr('edCoverEntity'))}
              <select class="ent-select" data-idx="${idx}" data-field="entity">
                ${coverOptions || `<option value="${escapeHtml(item.entity || '')}">${escapeHtml(item.entity || '')}</option>`}
              </select>
            </label>
            <label>
              ${escapeHtml(tr('edCustomName'))}
              <input type="text" class="ent-input" data-idx="${idx}" data-field="name" value="${escapeHtml(item.name || '')}" placeholder="${escapeHtml(tr('edFriendlyName'))}" />
            </label>
            <label>
              ${escapeHtml(tr('edWindowSensor'))}
              <select class="ent-select" data-idx="${idx}" data-field="window_sensor">
                ${sensorOptions}
              </select>
            </label>
            <div class="inline-checks">
              <label class="check-label">
                <input type="checkbox" class="ent-check" data-idx="${idx}" data-field="block_close_if_open" ${item.block_close_if_open ? 'checked' : ''} />
                ${escapeHtml(tr('edBlockClose'))}
              </label>
              <label class="check-label">
                <input type="checkbox" class="ent-check" data-idx="${idx}" data-field="invert_position" ${item.invert_position ? 'checked' : ''} />
                ${escapeHtml(tr('edInvertEntity'))}
              </label>
            </div>
          </div>
        `;
      })
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--paper-font-body1_-_font-family, inherit);
          color: var(--primary-text-color);
        }
        .editor-wrap {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-title {
          font-size: 0.9rem;
          font-weight: 600;
          border-bottom: 1px solid var(--divider-color, rgba(128,128,128,0.2));
          padding-bottom: 4px;
          margin-top: 4px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.82rem;
          color: var(--secondary-text-color);
        }
        input[type="text"], select {
          padding: 7px 9px;
          border-radius: 6px;
          border: 1px solid var(--divider-color, rgba(128,128,128,0.35));
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          font: inherit;
          font-size: 0.88rem;
        }
        .checks-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .check-label {
          flex-direction: row;
          align-items: center;
          gap: 6px;
          color: var(--primary-text-color);
          cursor: pointer;
        }
        .entity-box {
          border: 1px solid var(--divider-color, rgba(128,128,128,0.3));
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(127, 127, 127, 0.04);
        }
        .entity-box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .inline-checks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 2px;
        }
        .add-btn, .remove-btn {
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          cursor: pointer;
          font: inherit;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .add-btn {
          background: var(--primary-color, #03a9f4);
          color: #fff;
          align-self: flex-start;
        }
        .remove-btn {
          background: rgba(220, 38, 38, 0.14);
          color: #dc2626;
          padding: 4px 8px;
        }
      </style>

      <div class="editor-wrap" dir="${isRtl ? 'rtl' : 'ltr'}">
        <div class="section-title">${escapeHtml(tr('edGeneral'))}</div>
        <div class="grid-2">
          <label>
            ${escapeHtml(tr('edTitle'))}
            <input type="text" id="cfg-title" value="${escapeHtml(this._config.title || '')}" placeholder="${escapeHtml(tr('edOptionalTitle'))}" />
          </label>
          <label>
            ${escapeHtml(tr('edLanguage'))}
            <select id="cfg-lang">
              ${langOptionsHtml}
            </select>
          </label>
        </div>

        <label>
          ${escapeHtml(tr('edSlatsColor'))}
          <select id="cfg-color">
            <option value="gray" ${this._config.slats_color === 'gray' ? 'selected' : ''}>${escapeHtml(tr('edColorGray'))}</option>
            <option value="white" ${this._config.slats_color === 'white' ? 'selected' : ''}>${escapeHtml(tr('edColorWhite'))}</option>
            <option value="wood" ${this._config.slats_color === 'wood' ? 'selected' : ''}>${escapeHtml(tr('edColorWood'))}</option>
            <option value="black" ${this._config.slats_color === 'black' ? 'selected' : ''}>${escapeHtml(tr('edColorBlack'))}</option>
          </select>
        </label>

        <div class="checks-grid">
          <label class="check-label">
            <input type="checkbox" id="cfg-compact" ${this._config.compact ? 'checked' : ''} />
            ${escapeHtml(tr('edCompact'))}
          </label>
          <label class="check-label">
            <input type="checkbox" id="cfg-presets" ${this._config.show_presets !== false ? 'checked' : ''} />
            ${escapeHtml(tr('edShowPresets'))}
          </label>
          <label class="check-label">
            <input type="checkbox" id="cfg-buttons" ${this._config.show_buttons !== false ? 'checked' : ''} />
            ${escapeHtml(tr('edShowButtons'))}
          </label>
          <label class="check-label">
            <input type="checkbox" id="cfg-pct" ${this._config.show_percentage !== false ? 'checked' : ''} />
            ${escapeHtml(tr('edShowPct'))}
          </label>
          <label class="check-label">
            <input type="checkbox" id="cfg-invert" ${this._config.invert_position ? 'checked' : ''} />
            ${escapeHtml(tr('edInvertGlobal'))}
          </label>
          <label class="check-label">
            <input type="checkbox" id="cfg-haptic" ${this._config.haptic !== false ? 'checked' : ''} />
            ${escapeHtml(tr('edHaptic'))}
          </label>
        </div>

        <div class="section-title">${escapeHtml(tr('edShutters'))}</div>
        ${entitiesHtml}
        <button type="button" class="add-btn" id="add-entity-btn">${escapeHtml(tr('edAddShutter'))}</button>
      </div>
    `;

    this._bindEditorEvents(covers);
  }

  _bindEditorEvents(covers) {
    const bindSimple = (id, key, isCheckbox = false, rerender = false) => {
      const el = this.shadowRoot.getElementById(id);
      if (!el) return;
      el.addEventListener(isCheckbox || el.tagName === 'SELECT' ? 'change' : 'input', (e) => {
        this._config = {
          ...this._config,
          [key]: isCheckbox ? e.target.checked : e.target.value,
        };
        this._emitConfig();
        if (rerender) this._render();
      });
    };

    bindSimple('cfg-title', 'title');
    bindSimple('cfg-lang', 'language', false, true);
    bindSimple('cfg-color', 'slats_color');
    bindSimple('cfg-compact', 'compact', true);
    bindSimple('cfg-presets', 'show_presets', true);
    bindSimple('cfg-buttons', 'show_buttons', true);
    bindSimple('cfg-pct', 'show_percentage', true);
    bindSimple('cfg-invert', 'invert_position', true);
    bindSimple('cfg-haptic', 'haptic', true);

    this.shadowRoot.querySelectorAll('.ent-select, .ent-input, .ent-check').forEach((el) => {
      const eventName = el.type === 'text' ? 'input' : 'change';
      el.addEventListener(eventName, (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updated = [...this._config.entities];
        updated[idx] = { ...updated[idx], [field]: val };
        if (val === '' && field !== 'entity') {
          delete updated[idx][field];
        }
        this._config = { ...this._config, entities: updated };
        this._emitConfig();
      });
    });

    this.shadowRoot.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.remove);
        const updated = this._config.entities.filter((_, i) => i !== idx);
        this._config = { ...this._config, entities: updated };
        this._emitConfig();
        this._render();
      });
    });

    const addBtn = this.shadowRoot.getElementById('add-entity-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const nextCover = covers[0] || 'cover.new_shutter';
        this._config = {
          ...this._config,
          entities: [...(this._config.entities || []), { entity: nextCover }],
        };
        this._emitConfig();
        this._render();
      });
    }
  }
}

if (!customElements.get('modern-shutter-card')) {
  customElements.define('modern-shutter-card', ModernShutterCard);
}

if (!customElements.get('modern-shutter-card-editor')) {
  customElements.define('modern-shutter-card-editor', ModernShutterCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'modern-shutter-card',
  name: 'Modern Shutter Card',
  description:
    'A modern multi-language visual shutter & blinds card with presets, touch-lock, tilt, window sensor protection, RTL, and Sections View support.',
  preview: true,
  documentationURL: 'https://github.com/sharonoren1/modern-shutter-card',
});

console.info(
  `%c MODERN-SHUTTER-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;',
  'color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 4px 4px 0; padding: 2px 6px;'
);
