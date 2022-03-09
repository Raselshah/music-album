const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const albumContainer = elementById("albums");
  const artistContainer = elementById("artists");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

  artistContainer.textContent = "";
  albumContainer.textContent = "";
  keyword.value = "";
};

const showArtists = (data) => {
  console.log(data);
  if (data.artists === null) {
    alert("no item found");
    return;
  }
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist.strArtistThumb
            ? artist.strArtistThumb
            : "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "not available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "not available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const albumContainer = elementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  albumContainer.textContent = "";
};

const showAlbum = (album) => {
  // console.log(album);
  const albumContainer = elementById("albums");
  album.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
