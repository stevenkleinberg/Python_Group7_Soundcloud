import React from "react";
import Slider from "react-slick";
import SongTile from "./songTile";

const ResponsiveSlider = ({ title, description, songs }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <p className="mainfeed_slider_title">{title}</p>
      <p className="mainfeed_slider_desc">{description}</p>

      <Slider {...settings}>
        {songs?.map((song) => (
          <SongTile song={song} key={song.id} />
        ))}
      </Slider>
    </div>
  );
};

export default ResponsiveSlider;
