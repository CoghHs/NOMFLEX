import { useState } from "react";
import { useQuery } from "react-query";
import {
  IAPIResponse,
  IGetMoviesResult,
  IMovieDetail,
  getMovie,
  getPopular,
  makeImagePath,
} from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import MovieDetail from "../components/MovieDetail";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  justify-content: center;
  align-items: center;
`;

const MovieItem = styled(motion.li)``;

const MovieImg = styled(motion.img)`
  border-radius: 20px;
  width: 300px;
  height: 400px;
  object-fit: cover;
`;

const MovieTitle = styled.h1``;

const movieListVariants = {
  start: {
    scale: 0,
    opacity: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.18,
    },
  },
};

const movieItemVariants = {
  start: { scale: 0, opacity: 0 },
  end: { scale: 1, opacity: 1 },
};

function Popular() {
  const [clicked, setClicked] = useState(false);
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "popular"],
    getPopular
  );
  const { data: movieDetail, isLoading: detailLoading } =
    useQuery<IMovieDetail>(["movie", movieId], () => getMovie(movieId), {
      enabled: movieId !== "",
    });
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading . . .</Loader>
      ) : (
        <div>
          <MovieList
            key={movieId}
            variants={movieListVariants}
            initial="start"
            animate="end"
          >
            {data?.results.map((movie) => (
              <MovieItem key={movie.id} variants={movieItemVariants}>
                <MovieImg src={makeImagePath(movie.poster_path)} />
                <MovieTitle></MovieTitle>
              </MovieItem>
            ))}
          </MovieList>
          {clicked ? <MovieDetail data={movieDetail} /> : null}
        </div>
      )}
    </Wrapper>
  );
}

export default Popular;
