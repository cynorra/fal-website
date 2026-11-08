export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
}

// name|country|lat|lon|IANA timezone
const RAW = `New York|USA|40.7128|-74.0060|America/New_York
Los Angeles|USA|34.0522|-118.2437|America/Los_Angeles
Chicago|USA|41.8781|-87.6298|America/Chicago
Houston|USA|29.7604|-95.3698|America/Chicago
Phoenix|USA|33.4484|-112.0740|America/Phoenix
Philadelphia|USA|39.9526|-75.1652|America/New_York
San Antonio|USA|29.4241|-98.4936|America/Chicago
San Diego|USA|32.7157|-117.1611|America/Los_Angeles
Dallas|USA|32.7767|-96.7970|America/Chicago
San Francisco|USA|37.7749|-122.4194|America/Los_Angeles
Seattle|USA|47.6062|-122.3321|America/Los_Angeles
Denver|USA|39.7392|-104.9903|America/Denver
Boston|USA|42.3601|-71.0589|America/New_York
Atlanta|USA|33.7490|-84.3880|America/New_York
Miami|USA|25.7617|-80.1918|America/New_York
Las Vegas|USA|36.1699|-115.1398|America/Los_Angeles
Detroit|USA|42.3314|-83.0458|America/Detroit
Minneapolis|USA|44.9778|-93.2650|America/Chicago
Portland|USA|45.5152|-122.6784|America/Los_Angeles
Washington, D.C.|USA|38.9072|-77.0369|America/New_York
Nashville|USA|36.1627|-86.7816|America/Chicago
New Orleans|USA|29.9511|-90.0715|America/Chicago
Honolulu|USA|21.3069|-157.8583|Pacific/Honolulu
Anchorage|USA|61.2181|-149.9003|America/Anchorage
Toronto|Canada|43.6532|-79.3832|America/Toronto
Montreal|Canada|45.5017|-73.5673|America/Toronto
Vancouver|Canada|49.2827|-123.1207|America/Vancouver
Calgary|Canada|51.0447|-114.0719|America/Edmonton
Ottawa|Canada|45.4215|-75.6972|America/Toronto
Mexico City|Mexico|19.4326|-99.1332|America/Mexico_City
Guadalajara|Mexico|20.6597|-103.3496|America/Mexico_City
London|UK|51.5074|-0.1278|Europe/London
Manchester|UK|53.4808|-2.2426|Europe/London
Birmingham|UK|52.4862|-1.8904|Europe/London
Glasgow|UK|55.8642|-4.2518|Europe/London
Edinburgh|UK|55.9533|-3.1883|Europe/London
Dublin|Ireland|53.3498|-6.2603|Europe/Dublin
Paris|France|48.8566|2.3522|Europe/Paris
Marseille|France|43.2965|5.3698|Europe/Paris
Berlin|Germany|52.5200|13.4050|Europe/Berlin
Munich|Germany|48.1351|11.5820|Europe/Berlin
Hamburg|Germany|53.5511|9.9937|Europe/Berlin
Frankfurt|Germany|50.1109|8.6821|Europe/Berlin
Madrid|Spain|40.4168|-3.7038|Europe/Madrid
Barcelona|Spain|41.3851|2.1734|Europe/Madrid
Lisbon|Portugal|38.7223|-9.1393|Europe/Lisbon
Rome|Italy|41.9028|12.4964|Europe/Rome
Milan|Italy|45.4642|9.1900|Europe/Rome
Amsterdam|Netherlands|52.3676|4.9041|Europe/Amsterdam
Brussels|Belgium|50.8503|4.3517|Europe/Brussels
Vienna|Austria|48.2082|16.3738|Europe/Vienna
Zurich|Switzerland|47.3769|8.5417|Europe/Zurich
Stockholm|Sweden|59.3293|18.0686|Europe/Stockholm
Oslo|Norway|59.9139|10.7522|Europe/Oslo
Copenhagen|Denmark|55.6761|12.5683|Europe/Copenhagen
Helsinki|Finland|60.1699|24.9384|Europe/Helsinki
Warsaw|Poland|52.2297|21.0122|Europe/Warsaw
Prague|Czechia|50.0755|14.4378|Europe/Prague
Budapest|Hungary|47.4979|19.0402|Europe/Budapest
Bucharest|Romania|44.4268|26.1025|Europe/Bucharest
Athens|Greece|37.9838|23.7275|Europe/Athens
Kyiv|Ukraine|50.4501|30.5234|Europe/Kyiv
Moscow|Russia|55.7558|37.6173|Europe/Moscow
Saint Petersburg|Russia|59.9343|30.3351|Europe/Moscow
Istanbul|Turkey|41.0082|28.9784|Europe/Istanbul
Ankara|Turkey|39.9334|32.8597|Europe/Istanbul
Izmir|Turkey|38.4237|27.1428|Europe/Istanbul
Antalya|Turkey|36.8969|30.7133|Europe/Istanbul
Bursa|Turkey|40.1885|29.0610|Europe/Istanbul
Cairo|Egypt|30.0444|31.2357|Africa/Cairo
Lagos|Nigeria|6.5244|3.3792|Africa/Lagos
Nairobi|Kenya|-1.2921|36.8219|Africa/Nairobi
Johannesburg|South Africa|-26.2041|28.0473|Africa/Johannesburg
Cape Town|South Africa|-33.9249|18.4241|Africa/Johannesburg
Casablanca|Morocco|33.5731|-7.5898|Africa/Casablanca
Accra|Ghana|5.6037|-0.1870|Africa/Accra
Dubai|UAE|25.2048|55.2708|Asia/Dubai
Riyadh|Saudi Arabia|24.7136|46.6753|Asia/Riyadh
Tel Aviv|Israel|32.0853|34.7818|Asia/Jerusalem
Tehran|Iran|35.6892|51.3890|Asia/Tehran
Karachi|Pakistan|24.8607|67.0011|Asia/Karachi
Lahore|Pakistan|31.5497|74.3436|Asia/Karachi
Delhi|India|28.6139|77.2090|Asia/Kolkata
Mumbai|India|19.0760|72.8777|Asia/Kolkata
Bangalore|India|12.9716|77.5946|Asia/Kolkata
Kolkata|India|22.5726|88.3639|Asia/Kolkata
Chennai|India|13.0827|80.2707|Asia/Kolkata
Dhaka|Bangladesh|23.8103|90.4125|Asia/Dhaka
Bangkok|Thailand|13.7563|100.5018|Asia/Bangkok
Jakarta|Indonesia|-6.2088|106.8456|Asia/Jakarta
Singapore|Singapore|1.3521|103.8198|Asia/Singapore
Kuala Lumpur|Malaysia|3.1390|101.6869|Asia/Kuala_Lumpur
Manila|Philippines|14.5995|120.9842|Asia/Manila
Ho Chi Minh City|Vietnam|10.8231|106.6297|Asia/Ho_Chi_Minh
Hong Kong|China|22.3193|114.1694|Asia/Hong_Kong
Shanghai|China|31.2304|121.4737|Asia/Shanghai
Beijing|China|39.9042|116.4074|Asia/Shanghai
Taipei|Taiwan|25.0330|121.5654|Asia/Taipei
Seoul|South Korea|37.5665|126.9780|Asia/Seoul
Tokyo|Japan|35.6762|139.6503|Asia/Tokyo
Osaka|Japan|34.6937|135.5023|Asia/Tokyo
Sydney|Australia|-33.8688|151.2093|Australia/Sydney
Melbourne|Australia|-37.8136|144.9631|Australia/Melbourne
Brisbane|Australia|-27.4698|153.0251|Australia/Brisbane
Perth|Australia|-31.9505|115.8605|Australia/Perth
Adelaide|Australia|-34.9285|138.6007|Australia/Adelaide
Auckland|New Zealand|-36.8485|174.7633|Pacific/Auckland
Sao Paulo|Brazil|-23.5505|-46.6333|America/Sao_Paulo
Rio de Janeiro|Brazil|-22.9068|-43.1729|America/Sao_Paulo
Buenos Aires|Argentina|-34.6037|-58.3816|America/Argentina/Buenos_Aires
Santiago|Chile|-33.4489|-70.6693|America/Santiago
Lima|Peru|-12.0464|-77.0428|America/Lima
Bogota|Colombia|4.7110|-74.0721|America/Bogota
Caracas|Venezuela|10.4806|-66.9036|America/Caracas`;

export const CITIES: City[] = RAW.split("\n").map((l) => {
  const [name, country, lat, lon, tz] = l.split("|");
  return { name, country, lat: Number(lat), lon: Number(lon), tz };
});
