$(() => {
  $.ajax(`/listings/is_sold`, {type: "GET"})
    .then((rows) => {
      for (const listings of rows) {
        $(`#sold-${listings.id}`).css("display","flex");
        $(`#view-listing-${listings.id}`).css("display","none");
      }
    })
    .catch((err) => console.log(err));
});
