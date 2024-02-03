import { createEffect, createSignal } from "solid-js";
import "./App.css";

function App() {
  const [pokemonImg, setPokemonImg] = createSignal("");
  const [pokemonBackImg, setPokemonBackImg] = createSignal("");
  const [joke, setJoke] = createSignal<Joke>({
    setup: "",
    punchline: "",
  });

  // responseをHTMLにのせたいかたちに整形する

  const getPokemonFrontImg = async () => {
    // ここでAPIをたたく
    const id = getRandomInt(1, 151);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const body: any = await response.json();

    const image = body.sprites.front_default;
    console.log(image);
    setPokemonImg(image);
  };

  function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const getPokemonBackImg = async () => {
    // ここでAPIをたたく
    const id = getRandomInt(1, 151);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    const body: any = await response.json();

    const image = body.sprites.back_default;
    console.log(image);
    setPokemonBackImg(image);
  };

  const getJoke = async () => {
    // ここでAPIをたたく
    const response = await fetch(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );

    const body: any = await response.json();

    console.log(body)

    const joke: Joke = {
      setup: body[0].setup,
      punchline: body[0].punchline,
    };

    setJoke(joke);
  };

  createEffect(() => {
    getPokemonFrontImg();
    getPokemonBackImg();
    getJoke();
  });

  return (
    <>
      <h1>JOKE BATTLE!!</h1>
      <div class="card">
        <div class="setup">
          <div class="balloon1-right">
            <p>{joke().setup}</p>
          </div>
          <img class="pokemon-img__front" src={pokemonImg()} />
        </div>
        <div class="punchline">
          <img class="pokemon-img__back" src={pokemonBackImg()} />
          <div class="balloon1-left">
            <p>{joke().punchline}</p>
          </div>
        </div>
      </div>
      <a href="/">更新</a>
    </>
  );
}

type Joke = {
  setup: string;
  punchline: string;
};

export default App;
