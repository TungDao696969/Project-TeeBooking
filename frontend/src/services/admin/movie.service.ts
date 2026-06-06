import api from "@/lib/axios";
import { TrashMoviesResponse } from "@/types/movie.type";

export const movieAdminService = {
  getMovies: async (page = 1) => {
    const res = await api.get(`/movie?page=${page}`);
    return res.data;
  },

  getMovieById: async (id: string) => {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  async createMovie(data: FormData) {
    const response = await api.post("/movie", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateMovie: async ({ id, data }: { id: string; data: FormData }) => {
    const response = await api.patch(`/movie/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  deleteMovie: async (id: string) => {
    const response = await api.delete(`/movie/${id}`);

    return response.data;
  },
};

export const getTrashMoviesService = async (): Promise<TrashMoviesResponse> => {
  const response = await api.get("/movie/trash");

  return response.data;
};

export const restoreMovieService = async (id: string) => {
  const response = await api.patch(`/movie/${id}/restore`);

  return response.data;
};
