--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-05-25 11:07:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16495)
-- Name: directors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directors (
    directorid integer NOT NULL,
    name character varying(50) NOT NULL,
    bio character varying(1000),
    birthyear date,
    deathyear date
);


ALTER TABLE public.directors OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16493)
-- Name: directors_directorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directors_directorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directors_directorid_seq OWNER TO postgres;

--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 204
-- Name: directors_directorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directors_directorid_seq OWNED BY public.directors.directorid;


--
-- TOC entry 201 (class 1259 OID 16397)
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genreid integer NOT NULL,
    name character varying(50),
    description character varying(1000)
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: genres_genreid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_genreid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_genreid_seq OWNER TO postgres;

--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 200
-- Name: genres_genreid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_genreid_seq OWNED BY public.genres.genreid;


--
-- TOC entry 207 (class 1259 OID 16506)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    movieid integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(1000),
    directorid integer NOT NULL,
    genreid integer NOT NULL,
    featured boolean,
    imageurl character varying(300)
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16504)
-- Name: movies_movieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_movieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_movieid_seq OWNER TO postgres;

--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 206
-- Name: movies_movieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_movieid_seq OWNED BY public.movies.movieid;


--
-- TOC entry 209 (class 1259 OID 16524)
-- Name: user_movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_movies (
    usermovieid integer NOT NULL,
    userid integer,
    movieid integer
);


ALTER TABLE public.user_movies OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16522)
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_movies_usermovieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_movies_usermovieid_seq OWNER TO postgres;

--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_movies_usermovieid_seq OWNED BY public.user_movies.usermovieid;


--
-- TOC entry 203 (class 1259 OID 16435)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    birth_date date,
    email character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16433)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 2879 (class 2604 OID 16498)
-- Name: directors directorid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors ALTER COLUMN directorid SET DEFAULT nextval('public.directors_directorid_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 16400)
-- Name: genres genreid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN genreid SET DEFAULT nextval('public.genres_genreid_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 16509)
-- Name: movies movieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN movieid SET DEFAULT nextval('public.movies_movieid_seq'::regclass);


--
-- TOC entry 2881 (class 2604 OID 16527)
-- Name: user_movies usermovieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies ALTER COLUMN usermovieid SET DEFAULT nextval('public.user_movies_usermovieid_seq'::regclass);


--
-- TOC entry 2878 (class 2604 OID 16438)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3031 (class 0 OID 16495)
-- Dependencies: 205
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (17, 'Jonathan Demme', 'Robert Jonathan Demme was an American director, producer, and screenwriter.', '1944-01-01', '2017-01-01');
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (18, 'Judd Apatow', 'Judd Apatow is an American producer, writer, director, actor and stand-up comedian.', '1967-01-01', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (19, 'Todd Phillips', 'Todd Phillips is a producer and director, known for Joker (2019), Old School (2003)and Due Date (2010).', '1970-11-20', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (20, 'Gary Trousdale', 'American animator, film director, screenwriter and storyboard artist.', '1960-06-08', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (21, 'Ron Clements', 'American animator, screenwriter, film director and producer.', '1953-04-25', NULL);


--
-- TOC entry 3027 (class 0 OID 16397)
-- Dependencies: 201
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.genres (genreid, name, description) VALUES (21, 'Animated', 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.');
INSERT INTO public.genres (genreid, name, description) VALUES (22, 'Comedy', 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');
INSERT INTO public.genres (genreid, name, description) VALUES (23, 'Thriller', 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.');


--
-- TOC entry 3033 (class 0 OID 16506)
-- Dependencies: 207
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (4, 'Silence of the Lambs', 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', 17, 23, true, 'silenceofthelambs.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (5, 'Funny People', 'American black comedy-drama film written and directed by Judd Apatow, co-produced by Apatow Productions and Madison 23.', 18, 22, true, 'funnypeople.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (6, 'Joker', 'A party clown, leads an impoverished life with his ailing mother. when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos.', 19, 23, true, 'joker.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (7, 'The Hangover', 'Doug and his three best men go to Las Vegas to celebrate his bachelor party. However, the three best men wake up the next day with a hangover and realise that Doug is missing.', 19, 22, true, 'Hang Over.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (9, 'Beauty and the Beast', 'Belle, a beautiful young woman, agrees to live with the Beast in exchange for the return of her abducted father. Soon, Belle discovers that her hideous captor is actually an enchanted prince.', 20, 21, true, 'Beauty and the Beast.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (10, 'The Little Mermaid', 'Ursula, the sea witch, makes a devious deal with Princess Ariel allowing her to meet Eric, the human prince she loves. Unaware of her true intentions, Ariel lands herself in trouble.', 21, 21, true, 'The Little Mermaid.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (11, 'Melvin and Howard', 'When luckless dreamer Melvin Dummar (Paul Le Mat) rescues a grizzled, half-dead man (Jason Robards) from the desert, he is skeptical of the man''s claim that he is actually reclusive billionaire Howard Hughes.', 17, 22, true, 'Melvin and Howard.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (12, 'The Princess and the Frog', 'A young waitress, Tiana, embarks on a hilarious adventure after her fateful kiss with a frog prince who cannot wait to be human again.', 21, 21, true, 'The Princess and the Frog.png');
INSERT INTO public.movies (movieid, title, description, directorid, genreid, featured, imageurl) VALUES (13, 'The Manchurian Candidate', 'Raymond Shaw becomes a hero after saving his unit during the Gulf War and uses his reputation to rise up the ranks of politics. However, soldier Bennett Marco doubts that the incident even took place', 17, 23, true, 'The Manchurian Candidate.png');


--
-- TOC entry 3035 (class 0 OID 16524)
-- Dependencies: 209
-- Data for Name: user_movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (1, 1, 4);
INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (2, 3, 6);
INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (3, 2, 7);


--
-- TOC entry 3029 (class 0 OID 16435)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (userid, username, password, birth_date, email) VALUES (2, 'Sunny88', 'sunny', '1985-02-01', 'sunny@gmail.com');
INSERT INTO public.users (userid, username, password, birth_date, email) VALUES (3, 'Lavia', 'lavia', '1994-08-10', 'lavia@ymail.com');
INSERT INTO public.users (userid, username, password, birth_date, email) VALUES (1, 'Benjam56', 'benjamin', '1975-12-01', 'benjamin23@yahoo.com');


--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 204
-- Name: directors_directorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directors_directorid_seq', 21, true);


--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 200
-- Name: genres_genreid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_genreid_seq', 23, true);


--
-- TOC entry 3048 (class 0 OID 0)
-- Dependencies: 206
-- Name: movies_movieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_movieid_seq', 13, true);


--
-- TOC entry 3049 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_movies_usermovieid_seq', 3, true);


--
-- TOC entry 3050 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 3, true);


--
-- TOC entry 2887 (class 2606 OID 16503)
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (directorid);


--
-- TOC entry 2883 (class 2606 OID 16405)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genreid);


--
-- TOC entry 2889 (class 2606 OID 16511)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movieid);


--
-- TOC entry 2891 (class 2606 OID 16529)
-- Name: user_movies user_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT user_movies_pkey PRIMARY KEY (usermovieid);


--
-- TOC entry 2885 (class 2606 OID 16440)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2893 (class 2606 OID 16517)
-- Name: movies directorkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT directorkey FOREIGN KEY (directorid) REFERENCES public.directors(directorid);


--
-- TOC entry 2892 (class 2606 OID 16512)
-- Name: movies genrekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT genrekey FOREIGN KEY (genreid) REFERENCES public.genres(genreid);


--
-- TOC entry 2895 (class 2606 OID 16535)
-- Name: user_movies moviekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT moviekey FOREIGN KEY (movieid) REFERENCES public.movies(movieid);


--
-- TOC entry 2894 (class 2606 OID 16530)
-- Name: user_movies userkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT userkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2021-05-25 11:07:02

--
-- PostgreSQL database dump complete
--

