import { useState } from "react";
import { useQuery } from "react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getComingSoon,
  getMovie,
  makeImagePath,
} from "../api";
import MovieDetail from "../components/MovieDetail";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";

const Wrapper = styled.div`
  padding: 80px;
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
  width: 800px;
`;

const MovieItem = styled(motion.li)`
  cursor: pointer;
`;

const MovieImg = styled(motion.img)`
  border-radius: 20px;
  width: 300px;
  height: 400px;
  margin-bottom: 15px;
  object-fit: cover;
`;

const MovieTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

function ComingSoon() {
  const { scrollY } = useScroll();
  const [clicked, setClicked] = useState(false);
  const [movieId, setMovieId] = useState<string>("");
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movies", "comingSoon"],
    getComingSoon
  );
  const { data: movieDetail, isLoading: Loading } = useQuery<IMovieDetail>(
    ["movie", movieId],
    () => getMovie(movieId),
    {
      enabled: movieId !== "",
    }
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading . . .</Loader>
      ) : (
        <div>
          <MovieList variants={movieListVariants} initial="start" animate="end">
            {data?.results.map((movie) => (
              <MovieItem
                layoutId={movie.id + ""}
                key={movie.id}
                variants={movieItemVariants}
                onClick={() => {
                  setClicked(!clicked);
                  setMovieId(movie.id + "");
                }}
              >
                <MovieImg
                  whileHover={{ y: -15 }}
                  src={makeImagePath(movie.poster_path)}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            ))}
          </MovieList>
          {clicked ? (
            <MovieDetail
              scrollY={scrollY.get()}
              data={movieDetail}
              setClicked={setClicked}
              clicked={clicked}
              isLoading={isLoading}
            />
          ) : null}
        </div>
      )}
    </Wrapper>
  );
}

export default ComingSoon;
