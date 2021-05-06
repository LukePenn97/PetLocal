$(() => {
  $.ajax(`/listings/is_sold`, {type: "GET"})
    .then((rows) => {
      console.log(rows)
      for (const listings of rows) {
        // console.log("listings.listing_id:",listings.listing_id);
        $(`#sold-${listings.id}`).css("display","flex");
        $(`#view-listing-${listings.id}`).css("display","none");
      }
    })
    .catch((err)=>console.log(err));
});