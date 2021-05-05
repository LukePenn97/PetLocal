$(() => {
  $.ajax(`/favourites/is_fav`, {type: "GET"})
    .then((rows) => {
      for (const fav of rows) {
        console.log("fav.listing_id:",fav.listing_id);
        $(`#${fav.listing_id}`).css("color","#c81d25");
      }
    })
    .catch((err)=>console.log(err));
});