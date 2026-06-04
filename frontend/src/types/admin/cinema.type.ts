import type {
  Cinema as BaseCinema,
  CinemaPagination,
} from "@/types/cinema.type";

export type Cinema = BaseCinema;

export interface CinemasResponse {
  success: boolean;

  data: Cinema[];
  pagination: CinemaPagination;
}
