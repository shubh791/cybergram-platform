const mapLink = (city) =>
  `https://maps.google.com/?q=${city.replace(/ /g, "+")}+Cyber+Crime+Police+Station`;

const phone = "1930"; // National Cyber Helpline fallback

export const cityData = {

// ================== STATES ==================

"Andhra Pradesh": [
"Visakhapatnam","Vijayawada","Guntur","Tirupati","Nellore",
"Kurnool","Rajahmundry","Eluru","Anantapur","Kadapa"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Arunachal Pradesh": [
"Itanagar","Naharlagun","Tawang","Ziro","Pasighat",
"Roing","Bomdila","Tezu","Aalo","Changlang"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Assam": [
"Guwahati","Silchar","Dibrugarh","Jorhat","Tezpur",
"Tinsukia","Nagaon","Karimganj","Bongaigaon","Goalpara"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Bihar": [
"Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga",
"Purnia","Ara","Begusarai","Katihar","Munger"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Chhattisgarh": [
"Raipur","Bilaspur","Durg","Bhilai","Korba",
"Jagdalpur","Rajnandgaon","Ambikapur","Raigarh","Mahasamund"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Goa": [
"Panaji","Margao","Vasco da Gama","Mapusa","Ponda",
"Bicholim","Curchorem","Canacona","Pernem","Valpoi"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Gujarat": [
"Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar",
"Jamnagar","Junagadh","Gandhinagar","Anand","Nadiad"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Haryana": [
"Gurugram","Faridabad","Panipat","Sonipat","Karnal",
"Rohtak","Hisar","Ambala","Yamunanagar","Kurukshetra"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Himachal Pradesh": [
"Shimla","Solan","Mandi","Dharamshala","Kullu",
"Una","Hamirpur","Bilaspur","Chamba","Nahan"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Jharkhand": [
"Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar",
"Hazaribagh","Giridih","Ramgarh","Chaibasa","Palamu"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Karnataka": [
"Bangalore","Mysuru","Mangaluru","Hubli","Belagavi",
"Ballari","Tumakuru","Shivamogga","Udupi","Bidar"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Kerala": [
"Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam",
"Palakkad","Alappuzha","Kottayam","Kannur","Malappuram"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Madhya Pradesh": [
"Bhopal","Indore","Gwalior","Jabalpur","Ujjain",
"Sagar","Satna","Rewa","Ratlam","Chhindwara"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Maharashtra": [
"Mumbai","Pune","Nagpur","Nashik","Thane",
"Aurangabad","Solapur","Kolhapur","Satara","Jalgaon"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Manipur": [
"Imphal","Thoubal","Bishnupur","Churachandpur","Ukhrul",
"Senapati","Kakching","Tamenglong","Jiribam","Moreh"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Meghalaya": [
"Shillong","Tura","Jowai","Nongpoh","Williamnagar",
"Baghmara","Resubelpara","Mawkyrwat","Ampati","Khliehriat"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Mizoram": [
"Aizawl","Lunglei","Champhai","Serchhip","Kolasib",
"Lawngtlai","Saiha","Mamit","Bairabi","Thenzawl"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Nagaland": [
"Kohima","Dimapur","Mokokchung","Tuensang","Wokha",
"Zunheboto","Phek","Mon","Longleng","Kiphire"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Odisha": [
"Bhubaneswar","Cuttack","Rourkela","Sambalpur","Berhampur",
"Balasore","Baripada","Jeypore","Angul","Dhenkanal"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Punjab": [
"Chandigarh","Ludhiana","Amritsar","Jalandhar","Patiala",
"Bathinda","Moga","Hoshiarpur","Pathankot","Ferozepur"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Rajasthan": [
"Jaipur","Jodhpur","Udaipur","Kota","Ajmer",
"Bikaner","Alwar","Bhilwara","Sikar","Pali"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Sikkim": [
"Gangtok","Namchi","Gyalshing","Mangan","Rangpo",
"Singtam","Jorethang","Ravangla","Pakyong","Rhenock"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Tamil Nadu": [
"Chennai","Coimbatore","Madurai","Salem","Trichy",
"Erode","Tirunelveli","Vellore","Thoothukudi","Karur"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Telangana": [
"Hyderabad","Warangal","Karimnagar","Nizamabad","Khammam",
"Mahbubnagar","Ramagundam","Adilabad","Siddipet","Miryalaguda"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Tripura": [
"Agartala","Udaipur","Dharmanagar","Ambassa","Kailashahar",
"Belonia","Khowai","Sabroom","Teliamura","Sonamura"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Uttar Pradesh": [
"Lucknow","Noida","Ghaziabad","Kanpur","Agra",
"Varanasi","Meerut","Bareilly","Aligarh","Moradabad"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Uttarakhand": [
"Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur",
"Rishikesh","Nainital","Almora","Pithoragarh","Tehri"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"West Bengal": [
"Kolkata","Howrah","Durgapur","Asansol","Siliguri",
"Malda","Kharagpur","Bardhaman","Jalpaiguri","Raiganj"
].map(c => ({ name: c, phone, map: mapLink(c) })),

// ================== UNION TERRITORIES ==================

"Delhi": [
"New Delhi","Dwarka","Rohini","Saket","Janakpuri",
"Pitampura","Karol Bagh","Mayur Vihar","Laxmi Nagar","Uttam Nagar"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Chandigarh": [
"Sector 17","Sector 22","Sector 34","Manimajra","Sector 8",
"Sector 15","Sector 44","Sector 26","Sector 11","Industrial Area"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Jammu & Kashmir": [
"Srinagar","Jammu","Anantnag","Baramulla","Pulwama",
"Kathua","Udhampur","Kupwara","Poonch","Rajouri"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Ladakh": [
"Leh","Kargil","Diskit","Nubra","Drass",
"Zanskar","Nyoma","Hanle","Tangtse","Chushul"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Puducherry": [
"Puducherry","Karaikal","Mahe","Yanam","Oulgaret",
"Ariyankuppam","Bahour","Lawspet","Mudaliarpet","Reddiarpalayam"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Lakshadweep": [
"Kavaratti","Agatti","Amini","Andrott","Kalpeni",
"Chetlat","Kadmat","Minicoy","Bitra","Bangaram"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Andaman & Nicobar": [
"Port Blair","Diglipur","Mayabunder","Rangat","Havelock",
"Neil Island","Car Nicobar","Kamorta","Little Andaman","Campbell Bay"
].map(c => ({ name: c, phone, map: mapLink(c) })),

"Dadra & Nagar Haveli": [
"Silvassa","Amli","Naroli","Khanvel","Rakholi",
"Masat","Dudhani","Samarvarni","Velugam","Kherdi"
].map(c => ({ name: c, phone, map: mapLink(c) }))

};
