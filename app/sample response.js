const weatherResponse = {
  data: {
    time: "2023-12-04T14:31:00Z",
    values: {
      cloudBase: null,
      cloudCeiling: null,
      cloudCover: 8,
      dewPoint: 18.63,
      freezingRainIntensity: 0,
      humidity: 42,
      precipitationProbability: 0,
      pressureSurfaceLevel: 977.75,
      rainIntensity: 0,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: 33.13,
      temperatureApparent: 34.43,
      uvHealthConcern: 1,
      uvIndex: 3,
      visibility: 13.13,
      weatherCode: 1000,
      windDirection: 112.5,
      windGust: 3.5,
      windSpeed: 1,
    },
  },
  location: { lat: 6.6733877, lon: -1.5674516 },
};


//Geocoding with the opencagedata.com api
const geocodingResponse = {
  documentation: "https://opencagedata.com/api",
  licenses: [
    { name: "see attribution guide", url: "https://opencagedata.com/credits" },
  ],
  rate: { limit: 2500, remaining: 2357, reset: 1701820800 },
  results: [
    {
      annotations: [Object],
      bounds: [Object],
      components: [Object],
      confidence: 9,
      formatted: "unnamed road, Oforikrom Municipal District, Ghana",
      geometry: [Object],
    },
  ],
  status: { code: 200, message: "OK" },
  stay_informed: {
    blog: "https://blog.opencagedata.com",
    mastodon: "https://en.osm.town/@opencage",
  },
  thanks: "For using an OpenCage API",
  timestamp: {
    created_http: "Tue, 05 Dec 2023 17:12:28 GMT",
    created_unix: 1701796348,
  },
  total_results: 1,
};

//Breakdown of opencage geocoding response

const annotations = {
  DMS: { lat: "6° 40' 14.81340'' N", lng: "1° 33' 12.38004'' W" },
  MGRS: "30NXN5990037589",
  Maidenhead: "IJ96fq30ox",
  Mercator: { x: -172928.027, y: 739311.279 },
  OSM: {
    edit_url:
      "https://www.openstreetmap.org/edit?way=628213997#map=17/6.67078/-1.55344",
    note_url:
      "https://www.openstreetmap.org/note/new#map=17/6.67078/-1.55344&layers=N",
    url: "https://www.openstreetmap.org/?mlat=6.67078&mlon=-1.55344#map=17/6.67078/-1.55344",
  },
  UN_M49: {
    regions: {
      AFRICA: "002",
      GH: "288",
      "SUB-SAHARAN_AFRICA": "202",
      WESTERN_AFRICA: "011",
      WORLD: "001",
    },
    statistical_groupings: ["LEDC"],
  },
  callingcode: 233,
  currency: {
    alternate_symbols: ["GH¢", "GH₵"],
    decimal_mark: ".",
    html_entity: "&#x20B5;",
    iso_code: "GHS",
    iso_numeric: "936",
    name: "Ghanaian Cedi",
    smallest_denomination: 1,
    subunit: "Pesewa",
    subunit_to_unit: 100,
    symbol: "₵",
    symbol_first: 1,
    thousands_separator: ",",
  },
  flag: "🇬🇭",
  geohash: "ecnvuwku47b18h92n2w9",
  qibla: 65.41,
  roadinfo: {
    drive_on: "right",
    road: "unnamed road",
    road_type: "residential",
    speed_in: "km/h",
  },
  sun: {
    rise: {
      apparent: 1701756300,
      astronomical: 1701751860,
      civil: 1701754980,
      nautical: 1701753420,
    },
    set: {
      apparent: 1701798480,
      astronomical: 1701802980,
      civil: 1701799860,
      nautical: 1701801420,
    },
  },
  timezone: {
    name: "Africa/Accra",
    now_in_dst: 0,
    offset_sec: 0,
    offset_string: "+0000",
    short_name: "GMT",
  },
  what3words: { words: "credit.ranted.competing" },
};

const Bounds = {
  northeast: { lat: 6.6712, lng: -1.5533584 },
  southwest: { lat: 6.6707242, lng: -1.5542471 },
};
const Geometry = { lat: 6.6707815, lng: -1.5534389 };

const components = {
  "ISO_3166-1_alpha-2": "GH",
  "ISO_3166-1_alpha-3": "GHA",
  "ISO_3166-2": ["GH-AH"],
  _category: "road",
  _type: "road",
  continent: "Africa",
  country: "Ghana",
  country_code: "gh",
  county: "Oforikrom Municipal District",
  road: "unnamed road",
  road_type: "residential",
  state: "Ashanti Region",
  suburb: "Ayeduase",
};


//Reverse geocoding using expo location >> Location.reverseGeocodeAsync({latitude : 123456, longitude: 7891011})

const expoReverseGeocoding = [
  {
    city: "Kumasi",
    country: "Ghana",
    district: null,
    isoCountryCode: "GH",
    name: "626",
    postalCode: null,
    region: "Ashanti Region",
    street: "F Owusu - Berchie Avenue",
    streetNumber: "626",
    subregion: "Oforikrom Municipal",
    timezone: null,
  },
];