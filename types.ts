export interface FacilityRecord {
  negeri: string;
  seliaan: string;
  nama_fasil: string;
  kat_fasili: string;
  pemilik_ta: string;
  pbt: string;
  operator: string;
  tahun_mula: string;
  tahun_tama: string;
  alamat: string;
  daerah: string;
  parlimen: string;
  keluasan_h: string;
  kapasiti_r: string;
  anggaran_k: string;
  x: string;
  y: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface FacilityUtilization {
  name: string;
  state: string;
  capacity: number;
  usage: number;
  rate: number;
}

export interface WasteStatistics {
  totalFacilities: number;
  sanitariCount: number;
  nonSanitariCount: number;
  otherCount: number;
  categoryBreakdown: ChartData[];
  topStates: ChartData[];
  ownerDistribution: ChartData[];
  rawCategoryCounts: Record<string, number>;
  utilizationStats: FacilityUtilization[];
  averageUtilization: number;
}

export interface AIAnalysisItem {
  tajuk: string;
  simbol: string;
  huraian: string;
  warna: string;
}