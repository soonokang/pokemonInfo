import { useEffect, useState } from "react";
import PokeCard from "../../components/PokeCard";
import axios from "axios";
import AutoComplete from "../../components/AutoComplete";

function MainPage() {
  // 모든 포켓몬 데이터
  const [allPoketmons, setAllpoketmons] = useState([]);
  //실제 리스트로 보여주는 포켓몬 데이터
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  //한번에 보여지는 포켓몬 카드 수
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  useEffect(() => {
    fetchPokeData();
  }, []);

  const filterDisplayedPokemonData = (allpoketmons, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    //모든 포켓몬 데이터에서 limitNum만큼 더 가져오기
    const array = allpoketmons.filter((pokemon, index) => index + 1 <= limit);
    return array;
  };

  const fetchPokeData = async () => {
    try {
      //1008 포켓몬 데이터 받아오기
      const response = await axios.get(url);
      setAllpoketmons(response.data.results);
      //실제 화면에 보여줄 리스트 기억하는 state
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="pt-6 mt-20">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <div className="relative z-50">
          <AutoComplete
            allPoketmons={allPoketmons}
            setDisplayedPokemons={setDisplayedPokemons}
          />
        </div>
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0 ">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
              <PokeCard key={url} url={url} name={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다 .
            </h2>
          )}
        </div>
      </section>

      <div className="text-center">
        {allPoketmons.length > displayedPokemons.length &&
          displayedPokemons.length !== 1 && (
            <button
              onClick={() =>
                setDisplayedPokemons(
                  filterDisplayedPokemonData(allPoketmons, displayedPokemons)
                )
              }
              className="bg-slate-800 px-6 mt-8 mb-3 py-2 my-04 text-base rounded-lg font-bold text-white"
            >
              더보기
            </button>
          )}
      </div>
    </article>
  );
}

export default MainPage;
