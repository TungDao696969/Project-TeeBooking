import type {
  Cinema as BaseCinema,
  CinemaPagination,
} from "@/types/cinema.type";

export interface Cinema extends BaseCinema {
  deletedAt: string;
}

export interface CinemasResponse {
  success: boolean;

  data: Cinema[];
  pagination: CinemaPagination;
}
