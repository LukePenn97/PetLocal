$(() => {
  $("#search-listings-form").on("submit", function(event) {
    console.log('form submitted');
    event.preventDefault();
    paramaters = $(this).serialize();
    console.log("search.js", parameters);
    // router.get("/search", (req, res) => {
    //   res.json(parameters);
    // });
  }
});