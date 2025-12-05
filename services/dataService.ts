import { FacilityRecord, WasteStatistics, ChartData, FacilityUtilization } from '../types';

const csvData = `negeri,seliaan,nama_fasil,kat_fasili,pemilik_ta,pbt,operator,tahun_mula,tahun_tama,alamat,daerah,parlimen,keluasan_h,kapasiti_r,anggaran_k,x,y
Perlis,JPSPN,TPS Rimba Mas,Sanitari (Tahap 4),PTP,MP KANGAR,Umpan Jaya Sdn.Bhd,2021,2027,"Mukim Titi Tinggi, 02100 Perlis",Perlis,P.001 - Padang Besar,30,150,177,100.2711,6.5987
Perlis,JPSPN,LTP Padang Siding,Leachate Treatment Plant(LTP),PBT,MP KANGAR,RAF Technologies Sdn.Bhd,2019,2024,"TP Padang Siding,02600 Arau, perlis",Perlis,P.003 - Arau,28.59,250m? (LTP),250m? (LTP),100.30105,6.44717
Kedah,JPSPN,TPS Jabi,Sanitari (Tahap 4),Kerajaan Negeri,MB Alor Setar,Greenviro Solutions Sdn.Bhd,2021,2027,"Lot 2052 & Lot PT60 H.S. D) 1/94, Kg Bukit Tok Bertandok, Mukim Jabi, Daerah Pokok Sena.",Kota Setar,P.007 - Pokok Sena,55.8,550,55,100.5222,6.2307
Kedah,JPSPN,TPS Sg. Lalang,Sanitari (Tahap 4),PTP,MP Sungai Petani,Greenviro Solutions Sdn.Bhd,2020,2025,"Lot 2353, Mukim Sungai Lalang, Daerah Kuala Muda.",Kuala Muda,P.014 - Sg. Petani,60,600,60,100.4851,5.6575
Kedah,JPSPN,LTP Sg. Lalang,Leachate Treatment Plant(LTP),PBT,MP Sungai Petani,Greenviro Solutions Sdn.Bhd,2020,2025,"Tapak Pelupusan Sisa Pepejal Sungai Lalang, 08000 Sungai Petani, Kedah.",Kuala Muda,P.014 - Sg. Petani,60,1000m? (LTP),220m? (LTP),100.5284,5.6322
Kedah,JPSPN,LTP Jabi,Leachate Treatment Plant(LTP),PBT,MB Alor Setar,Greenviro Solutions Sdn.Bhd,2020,2025,"Lot 2052 & Lot PT60 H.S. D) 1/94, Kg Bukit Tok Bertandok, Mukim Jabi, Daerah Pokok Sena.",Kota Setar,P.007 - Pokok Sena,55.8,1000m? (LTP),300m? (LTP),100.5222,6.2307
Kedah,JPSPN,TPS Alor Pongsu,Bukan Sanitari,Kerajaan Negeri,MP Bandar Baharu,SWM Environment Sdn Bhd,1980,2025,"Lot 6625 Mukim Alor Pongsu, Daerah Bandar Baharu.",Bandar Baharu,P.059 - Parit Buntar,4.0,TM,15,100.584,5.1384
Kedah,PBT/Kerajaan Negeri,TP Padang Siding,Bukan Sanitari,Kerajaan Negeri,MP KANGAR,TM,TM,TM,"Padang Siding, 02600 Arau",Perlis,P.003 - Arau,28.59,TM,TM,100.30105,6.44717
Pulau Pinang,JPSPN,TPS Pulau Burung,Sanitari (Tahap 4),Kerajaan Negeri,MBSP,Heng Hiang Huat Sdn.Bhd,2020,2027,"Lot 1121 & Lot 1122, Mukim 14, Daerah Seberang Perai Selatan, 14300 Nibong Tebal, Pulau Pinang.",Seberang Perai Selatan,P.047 - Nibong Tebal,58.7,1100,150,100.4578,5.1884
Pulau Pinang,JPSPN,LTP Pulau Burung,Leachate Treatment Plant(LTP),PBT,MBSP,Heng Hiang Huat Sdn.Bhd,2020,2027,"Tapak Pelupusan Sisa Pepejal Pulau Burung, 14300 Nibong Tebal, Pulau Pinang.",Seberang Perai Selatan,P.047 - Nibong Tebal,58.7,1500m? (LTP),350m? (LTP),100.4578,5.1884
Pulau Pinang,JPSPN,Transfer Station Juru,Transfer Station,Kerajaan Negeri,MBSP,SWM Environment Sdn Bhd,2022,2027,"PT 8000 dan PT 8001, Mukim 14, Daerah Seberang Perai Tengah.",Seberang Perai Tengah,P.045 - Batu Kawan,4.0,1800,2,100.4128,5.3218
Pulau Pinang,PBT/Kerajaan Negeri,TP Jelutong,Bukan Sanitari,Kerajaan Negeri,MBPP,TM,TM,TM,"Jelutong, Pulau Pinang",Pulau Pinang,P.050 - Jelutong,30.0,TM,TM,100.3167,5.4079
Perak,JPSPN,TPS Alor Pongsu,Sanitari (Tahap 4),PTP,MP Bandar Baharu,SWM Environment Sdn Bhd,2023,2028,"Lot 6625 Mukim Alor Pongsu, Daerah Bandar Baharu.",Kerian,P.059 - Parit Buntar,45.0,200,30,100.584,5.1384
Perak,JPSPN,TPS Changkat Jong,Sanitari (Tahap 4),Kerajaan Negeri,MP Teluk Intan,E-Idaman Sdn.Bhd,2020,2025,"Lot 10793 Mukim Changkat Jong, Daerah Hilir Perak.",Hilir Perak,P.076 - Teluk Intan,100.0,600,60,101.0772,4.0628
Perak,JPSPN,LTP Changkat Jong,Leachate Treatment Plant(LTP),PBT,MP Teluk Intan,E-Idaman Sdn.Bhd,2020,2025,"Tapak Pelupusan Sisa Pepejal Changkat Jong, 36000 Teluk Intan, Perak.",Hilir Perak,P.076 - Teluk Intan,100.0,1000m? (LTP),300m? (LTP),101.0772,4.0628
Perak,JPSPN,Transfer Station Batu Gajah,Transfer Station,PBT,MP Batu Gajah,E-Idaman Sdn.Bhd,2022,2027,"PT 151528, Mukim Sungai Terap, Daerah Kinta.",Kinta,P.070 - Beruas,5.0,600,2.5,101.0494,4.4842
Perak,JPSPN,Transfer Station Gopeng,Transfer Station,PBT,MP KAMPAR,E-Idaman Sdn.Bhd,2022,2027,"Lot 30364, Mukim Teja, Daerah Kampar.",Kampar,P.070 - Beruas,5.0,600,2.5,101.2185,4.4447
Perak,JPSPN,Transfer Station Kuala Kangsar,Transfer Station,PBT,MP Kuala Kangsar,E-Idaman Sdn.Bhd,2022,2027,"PT 1238, Mukim Sayong, Daerah Kuala Kangsar.",Kuala Kangsar,P.061 - Parit,5.0,600,2.5,100.9419,4.7824
Perak,JPSPN,Transfer Station Manjung,Transfer Station,PBT,MP Manjung,E-Idaman Sdn.Bhd,2022,2027,"PT 35749, Mukim Sitiawan, Daerah Manjung.",Manjung,P.068 - Lumut,5.0,600,2.5,100.6728,4.1481
Perak,JPSPN,Transfer Station Taiping,Transfer Station,PBT,MP Taiping,E-Idaman Sdn.Bhd,2022,2027,"Lot 4181, Mukim Tupai, Daerah Larut & Matang.",Larut & Matang,P.060 - Bukit Gantang,5.0,600,2.5,100.7583,4.8622
Perak,PBT/Kerajaan Negeri,TP Bercham,Bukan Sanitari,Kerajaan Negeri,MB Ipoh,TM,TM,TM,"Bercham, Ipoh",Kinta,P.066 - Tambun,15.0,TM,TM,101.1276,4.6369
Selangor,JPSPN,TPS Sg. Kertas,Sanitari (Tahap 4),Kerajaan Negeri,MB Shah Alam,Wastemanagment System Sdn.Bhd,2020,2025,"Lot 1367 & 1368, Mukim Sungai Kertas, Daerah Gombak.",Gombak,P.098 - Sungai Buloh,120.0,3000,100,101.6214,3.2215
Selangor,JPSPN,LTP Sg. Kertas,Leachate Treatment Plant(LTP),PBT,MB Shah Alam,Wastemanagment System Sdn.Bhd,2020,2025,"Tapak Pelupusan Sisa Pepejal Sungai Kertas, 68100 Batu Caves, Selangor.",Gombak,P.098 - Sungai Buloh,120.0,2000m? (LTP),450m? (LTP),101.6214,3.2215
Selangor,JPSPN,TPS Kuala Selangor,Sanitari (Tahap 4),PTP,MD Kuala Selangor,Waste Recycle Sdn.Bhd,2022,2027,"Lot 5951, Mukim Bestari Jaya, Daerah Kuala Selangor.",Kuala Selangor,P.095 - Kuala Selangor,50.0,400,30,101.3855,3.3134
Selangor,JPSPN,TPS Jeram,Sanitari (Tahap 4),Kerajaan Negeri,MD Kuala Langat,Wastemanagment System Sdn.Bhd,2023,2028,"Lot 52458, Mukim Bestari Jaya, Daerah Kuala Selangor.",Kuala Selangor,P.096 - Kapar,100.0,3000,300,101.3551,3.2384
Selangor,JPSPN,Transfer Station Ampang Jaya,Transfer Station,PBT,MP Ampang Jaya,Waste Recycle Sdn.Bhd,2022,2027,"Lot 407, Mukim Ampang, Daerah Gombak.",Gombak,P.100 - Gombak,2.0,500,2.5,101.7618,3.1554
Selangor,JPSPN,Transfer Station Klang,Transfer Station,PBT,MP Klang,Waste Recycle Sdn.Bhd,2022,2027,"Lot 1424, Mukim Kapar, Daerah Klang.",Klang,P.110 - Klang,2.0,500,2.5,101.4429,3.1251
Selangor,PBT/Kerajaan Negeri,TP Sg. Kertas,Bukan Sanitari,Kerajaan Negeri,MB Shah Alam,TM,TM,TM,"Sg. Kertas, Selangor",Gombak,P.098 - Sungai Buloh,120.0,TM,TM,101.6214,3.2215
Negeri Sembilan,JPSPN,TPS Sg. Sembilang,Sanitari (Tahap 4),Kerajaan Negeri,MP Port Dickson,SWM Environment Sdn Bhd,2020,2025,"Lot 1098 & 1099, Mukim Jimah, Daerah Port Dickson.",Port Dickson,P.132 - Port Dickson,50.0,750,50,101.8906,2.5152
Negeri Sembilan,JPSPN,LTP Sg. Sembilang,Leachate Treatment Plant(LTP),PBT,MP Port Dickson,SWM Environment Sdn Bhd,2020,2025,"Tapak Pelupusan Sisa Pepejal Sg. Sembilang, 71000 Port Dickson, Negeri Sembilan.",Port Dickson,P.132 - Port Dickson,50.0,1200m? (LTP),300m? (LTP),101.8906,2.5152
Melaka,JPSPN,TPS Sg. Udang,Sanitari (Tahap 4),Kerajaan Negeri,MB Melaka,SWM Environment Sdn Bhd,2021,2027,"Lot 1326 & 1327, Mukim Sungai Udang, Daerah Melaka Tengah.",Melaka Tengah,P.136 - Tangga Batu,85.0,700,70,102.1666,2.2743
Melaka,JPSPN,LTP Sg. Udang,Leachate Treatment Plant(LTP),PBT,MB Melaka,SWM Environment Sdn Bhd,2021,2027,"Tapak Pelupusan Sisa Pepejal Sungai Udang, 76300 Sungai Udang, Melaka.",Melaka Tengah,P.136 - Tangga Batu,85.0,1500m? (LTP),300m? (LTP),102.1666,2.2743
Johor,JPSPN,TPS Seelong,Sanitari (Tahap 4),PTP,MB Johor Bahru,SWM Environment Sdn Bhd,2022,2027,"Lot 7027 & 7028, Mukim Senai, Daerah Kulai.",Kulai,P.163 - Kulai,80.0,2000,100,103.7788,1.6966
Johor,JPSPN,LTP Seelong,Leachate Treatment Plant(LTP),PBT,MB Johor Bahru,SWM Environment Sdn Bhd,2022,2027,"Tapak Pelupusan Sisa Pepejal Seelong, 81400 Senai, Johor.",Kulai,P.163 - Kulai,80.0,2000m? (LTP),500m? (LTP),103.7788,1.6966
Johor,JPSPN,Transfer Station Johor Bahru,Transfer Station,PBT,MB Johor Bahru,SWM Environment Sdn Bhd,2022,2027,"Lot 1326 & 1327, Mukim Johor Bahru, Daerah Johor Bahru.",Johor Bahru,P.160 - Johor Bahru,5.0,750,3.0,103.7854,1.4878
Pahang,JPSPN,TPS Jabor,Sanitari (Tahap 4),Kerajaan Negeri,MP Kuantan,E-Idaman Sdn.Bhd,2021,2026,"Lot 833, Mukim Sungai Karang, Daerah Kuantan.",Kuantan,P.084 - Kuantan,50.0,500,50,103.385,3.9577
Pahang,JPSPN,LTP Jabor,Leachate Treatment Plant(LTP),PBT,MP Kuantan,E-Idaman Sdn.Bhd,2021,2026,"Tapak Pelupusan Sisa Pepejal Jabor, 26080 Kuantan, Pahang.",Kuantan,P.084 - Kuantan,50.0,1000m? (LTP),300m? (LTP),103.385,3.9577
Pahang,JPSPN,TPS Jerantut,Sanitari (Tahap 4),PBT,MD Jerantut,E-Idaman Sdn.Bhd,2023,2028,"Lot 10141, Mukim Pulau Tawar, Daerah Jerantut.",Jerantut,P.087 - Jerantut,20.0,100,20,102.5024,3.8824
Pahang,JPSPN,Transfer Station Indera Mahkota,Transfer Station,PBT,MP Kuantan,E-Idaman Sdn.Bhd,2022,2027,"Lot 3848, Mukim Sungai Karang, Daerah Kuantan.",Kuantan,P.083 - Indera Mahkota,2.0,300,2.0,103.3332,3.8344
Terengganu,JPSPN,TPS Bukit Tagar,Sanitari (Tahap 4),Kerajaan Negeri,MB Kuala Terengganu,E-Idaman Sdn.Bhd,2020,2025,"Lot 1234, Mukim Bukit Tagar, Daerah Hulu Terengganu.",Hulu Terengganu,P.038 - Hulu Terengganu,50.0,400,40,102.8596,5.1678
Terengganu,JPSPN,LTP Bukit Tagar,Leachate Treatment Plant(LTP),PBT,MB Kuala Terengganu,E-Idaman Sdn.Bhd,2020,2025,"Tapak Pelupusan Sisa Pepejal Bukit Tagar, 21700 Kuala Berang, Terengganu.",Hulu Terengganu,P.038 - Hulu Terengganu,50.0,800m? (LTP),250m? (LTP),102.8596,5.1678
Kelantan,JPSPN,TPS Machang,Sanitari (Tahap 4),PTP,MD Machang,E-Idaman Sdn.Bhd,2022,2027,"Lot 456, Mukim Labok, Daerah Machang.",Machang,P.031 - Machang,30.0,200,20,102.2685,5.7766
Kelantan,JPSPN,LTP Machang,Leachate Treatment Plant(LTP),PBT,MD Machang,E-Idaman Sdn.Bhd,2022,2027,"Tapak Pelupusan Sisa Pepejal Machang, 18500 Machang, Kelantan.",Machang,P.031 - Machang,30.0,600m? (LTP),180m? (LTP),102.2685,5.7766
Kelantan,JPSPN,Transfer Station Kota Bharu,Transfer Station,PBT,MP Kota Bharu,E-Idaman Sdn.Bhd,2022,2027,"Lot 789, Mukim Kubang Kerian, Daerah Kota Bharu.",Kota Bharu,P.021 - Kota Bharu,2.0,300,2.0,102.2583,6.0711
Sarawak,PBT/Kerajaan Negeri,TP Mambong,Sanitari (Tahap 1),Kerajaan Negeri,MB Kuching Utara,TM,TM,TM,"Batu 10, Jalan Penrissen, Kuching",Kuching,P.196 - Kota Samarahan,30.0,TM,TM,110.3667,1.4833
Sarawak,PBT/Kerajaan Negeri,TP Mergong,Bukan Sanitari,Kerajaan Negeri,MB Miri,TM,TM,TM,"Mergong, Miri",Miri,P.219 - Miri,10.0,TM,TM,114.0042,4.3547
Sabah,PBT/Kerajaan Negeri,TP Kg. Simunul,Bukan Sanitari,Persendirian-Sewa,MD Semporna,TM,TM,TM,"Kg. Simunul, Semporna",Semporna,P.189 - Semporna,0.8,TM,20,118.6145,4.4716
Sabah,PBT/Kerajaan Negeri,TP Sipitang,Bukan Sanitari,Kerajaan Negeri,MD Sipitang,TM,TM,TM,"Merintaman, Sipitang",Sipitang,P.178 - Sipitang,0.8,TM,20,115.5389,5.054
Sabah,PBT/Kerajaan Negeri,TP Jln Mosogit,Bukan Sanitari,Kerajaan Negeri,MD Tambunan,TM,TM,TM,"Bt 7, Mangkatai, Jalan Keningau-Tambunan",Tambunan,P.180 - Keningau,4.1,TM,8,116.3101,5.6166
Sabah,PBT/Kerajaan Negeri,TP Mengkadait,Bukan Sanitari,Kerajaan Negeri,MD Tambunan,TM,TM,TM,"Mengkadait, Tambunan",Tambunan,P.180 - Keningau,4.1,TM,25,116.3101,5.6166
Sabah,PBT/Kerajaan Negeri,TP Kolopis,Bukan Sanitari,Kerajaan Negeri,DBKK,TM,TM,TM,"Kolopis, Kota Kinabalu",Kota Kinabalu,P.172 - Penampang,15.0,TM,TM,116.1415,5.9238
Sabah,PBT/Kerajaan Negeri,TP Tawau,Bukan Sanitari,Kerajaan Negeri,MP Tawau,TM,TM,TM,"Batu 10, Jalan Kuhara, Tawau",Tawau,P.190 - Tawau,15.0,TM,TM,117.9157,4.3323
Sabah,PBT/Kerajaan Negeri,TP Kimolod,Bukan Sanitari,Kerajaan Negeri,MP Sandakan,TM,TM,TM,"Mile 8, Jalan Labuk Sandakan",Sandakan,P.186 - Sandakan,101.2,TM,220,118.0295,5.8678
Sabah,PBT/Kerajaan Negeri,TP Laya-Laya,Bukan Sanitari,Kerajaan Negeri,MD Tuaran,TM,TM,TM,"Laya-Laya, Tuaran",Tuaran,P.171 - Tuaran,12.1,TM,TM,116.273,6.219
Sabah,PBT/Kerajaan Negeri,TP Ranau,Bukan Sanitari,Kerajaan Negeri,MD Ranau,TM,TM,TM,"Mile 8, Jalan Labuk Sandakan",Ranau,P.186 - Sandakan,101.2,TM,220,118.0295,5.8678
Sabah,PBT/Kerajaan Negeri,TP Kundasang,Bukan Sanitari,Kerajaan Negeri,MD Ranau,TM,TM,TM,"Kundasang, Ranau",Ranau,P.179 - Ranau,0.4,TM,5,116.591,5.981
Sabah,PBT/Kerajaan Negeri,TP Telipok,Bukan Sanitari,Kerajaan Negeri,DBKK,TM,TM,TM,"Telipok, Kota Kinabalu",Kota Kinabalu,P.171 - Tuaran,18.2,TM,TM,116.177,6.103
Sabah,PBT/Kerajaan Negeri,TP Kg. Simunul,Bukan Sanitari,Persendirian-Sewa,MD Semporna,TM,TM,TM,"Kg. Simunul, Semporna",Semporna,P.189 - Semporna,0.8,TM,20,118.6145,4.4716
Sabah,PBT/Kerajaan Negeri,TP Sipitang,Bukan Sanitari,Kerajaan Negeri,MD Sipitang,TM,TM,TM,"Merintaman, Sipitang",Sipitang,P.178 - Sipitang,0.8,TM,20,115.5389,5.054
Sabah,PBT/Kerajaan Negeri,TP Jln Mosogit,Bukan Sanitari,Kerajaan Negeri,MD Tambunan,TM,TM,TM,"Bt 7, Mangkatai, Jalan Keningau-Tambunan",Tambunan,P.180 - Keningau,4.1,TM,8,116.3101,5.6166
Sabah,PBT/Kerajaan Negeri,TP Mengkadait,Bukan Sanitari,Kerajaan Negeri,MD Tambunan,TM,TM,TM,"Mengkadait, Tambunan",Tambunan,P.180 - Keningau,4.1,TM,25,116.3101,5.6166
Wilayah Persekutuan,JPSPN,Transfer Station Taman Beringin,Transfer Station,PBT,DBKL,Alam Flora Sdn.Bhd,2022,2027,"Lot 1334, Mukim Batu, Daerah Kuala Lumpur.",Kuala Lumpur,P.114 - Kepong,5.0,2000,10.0,101.6963,3.2201
Wilayah Persekutuan,JPSPN,Transfer Station Jalan Chan Sow Lin,Transfer Station,PBT,DBKL,Alam Flora Sdn.Bhd,2022,2027,"Lot 380, Mukim Kuala Lumpur, Daerah Kuala Lumpur.",Kuala Lumpur,P.118 - Cheras,5.0,1000,5.0,101.7136,3.1256`;

const parseCSV = (csv: string): FacilityRecord[] => {
  // Use a state-machine parser to handle newlines inside quotes correctly
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i+1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Handle escaped quote ("")
        currentVal += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of cell
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      // End of line
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n after \r
      }
      
      currentRow.push(currentVal.trim());
      // Only push if the row has content (not just a trailing newline)
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  // Push the very last row if it didn't end with a newline
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    rows.push(currentRow);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map(h => h.replace(/^"|"$/g, ''));
  const data: FacilityRecord[] = [];

  for (let i = 1; i < rows.length; i++) {
    const rowValues = rows[i];
    
    // Sometimes last line is empty
    if (rowValues.length === 0 || (rowValues.length === 1 && !rowValues[0])) continue;

    // Clean up quotes from values
    const cleanedValues = rowValues.map(v => {
      // Remove surrounding quotes if they exist
      if (v.startsWith('"') && v.endsWith('"')) {
        return v.slice(1, -1);
      }
      return v;
    });

    if (cleanedValues.length >= headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        // Ensure we don't access undefined index
        row[header] = cleanedValues[index] || '';
      });
      data.push(row as FacilityRecord);
    }
  }
  return data;
};

const parseNumber = (val: string): number => {
  if (!val || val === 'TM' || val === 'NA') return 0;
  // Remove commas and handle mixed text
  const cleanVal = val.replace(/,/g, '');
  const match = cleanVal.match(/([\d\.]+)/);
  if (match) {
    const num = parseFloat(match[1]);
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

export const processCsvData = (customCsv?: string): WasteStatistics => {
  // Use custom CSV if provided, otherwise fallback to built-in data
  const dataToParse = customCsv || csvData;
  const records = parseCSV(dataToParse);
  const totalFacilities = records.length;

  // Category Analysis
  const categoryCounts: Record<string, number> = {};
  records.forEach(record => {
    const key = record.kat_fasili || 'Tidak Diketahui';
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
  });

  let sanitariCount = 0;
  let nonSanitariCount = 0;
  let otherCount = 0;

  Object.entries(categoryCounts).forEach(([category, count]) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('sanitari') && !catLower.includes('bukan')) {
      sanitariCount += count;
    } else if (catLower.includes('bukan sanitari')) {
      nonSanitariCount += count;
    } else {
      otherCount += count;
    }
  });

  const categoryBreakdown: ChartData[] = [
    { name: 'Sanitari', value: sanitariCount, fill: '#10B981' }, // emerald-500
    { name: 'Bukan Sanitari', value: nonSanitariCount, fill: '#EF4444' }, // red-500
    { name: 'Lain-lain (Transfer/LTP)', value: otherCount, fill: '#6366F1' }, // indigo-500
  ];

  // State Analysis
  const stateCounts: Record<string, number> = {};
  records.forEach(record => {
    const key = record.negeri || 'Tidak Diketahui';
    stateCounts[key] = (stateCounts[key] || 0) + 1;
  });

  const topStates: ChartData[] = Object.entries(stateCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value, fill: '#F97316' })); // orange-500

  // Owner Analysis
  const ownerCounts: Record<string, number> = {};
  records.forEach(record => {
    const key = record.pemilik_ta || 'Tidak Diketahui';
    ownerCounts[key] = (ownerCounts[key] || 0) + 1;
  });

  const ownerDistribution: ChartData[] = Object.entries(ownerCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value], index) => ({ 
      name, 
      value,
      fill: ['#EC4899', '#8B5CF6', '#EAB308', '#6B7280', '#A855F7'][index % 5]
    }));

  // Utilization Analysis
  const utilizationStats: FacilityUtilization[] = records
    .map(record => {
      const capacity = parseNumber(record.kapasiti_r);
      const usage = parseNumber(record.anggaran_k);
      
      if (capacity > 0 && usage > 0) {
        return {
          name: record.nama_fasil,
          state: record.negeri,
          capacity,
          usage,
          rate: parseFloat(((usage / capacity) * 100).toFixed(1))
        };
      }
      return null;
    })
    .filter((item): item is FacilityUtilization => item !== null)
    .sort((a, b) => b.rate - a.rate);

  const averageUtilization = utilizationStats.length > 0
    ? parseFloat((utilizationStats.reduce((acc, curr) => acc + curr.rate, 0) / utilizationStats.length).toFixed(1))
    : 0;

  return {
    totalFacilities,
    sanitariCount,
    nonSanitariCount,
    otherCount,
    categoryBreakdown,
    topStates,
    ownerDistribution,
    rawCategoryCounts: categoryCounts,
    utilizationStats,
    averageUtilization
  };
};