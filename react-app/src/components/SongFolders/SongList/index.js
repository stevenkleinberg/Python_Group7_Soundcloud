import "./songlist.css";

import GalleryCard from "../../GalleryCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GridDisplay from "../../LibraryPage/Likes/GridDisplay";

const SongsList = () => {
  const history = useHistory();
  const songs = useSelector((state) => state.songs);
  const sessionUser = useSelector((state) => state.session.user);
  // const allsongs = [];
  // for (let key in songs) {
  //   console.log("key in loop", songs[key])
  //   if(songs[key].user_id === sessionUser?.id){
  //     allsongs.push((key = songs[key]));
  //   }
  // }
  const userSongs = []
  const songsArr = Object.values(songs)
  songsArr.forEach( song => {

    if (song.user_id === sessionUser?.id){
      userSongs.push(song)
    }
  })
  console.log(userSongs)
  const navLink = (id) => {
    history.push(`/songs/${id}`);
  };

  return (
    <>
    <div>
      <h3>Hear Your Uploaded Songs:</h3>
    </div>
      <div>

          <GridDisplay likedSongs={userSongs} />

      </div>
    </>
  );
};

export default SongsList;
