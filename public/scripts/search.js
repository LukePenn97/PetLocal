$(() => {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createListingElement = function(listing) {
    return $(`
  <div class="col">
    <div class="card h-100">
      <a href="/listings/${listing.id}">
        <div class="img-div">
          <img src="${escape(listing.image_url)}" class="card-img-top img-fluid">
        </div>
        <div class="card-body">
          <h5 class="listing-title">
            ${escape(listing.title)}
          </h5>
          <h6 class="listing-price">
            ${escape(listing.price / 100)}
          </h6>
          <p class="listing-description">
            ${escape(listing.description)}
          </p>
          <a class="favo" data-id="${listing.id}">
            <i class="fas fa-star"></i>
          </a>
        </div>
      </a>
    </div>
  </div>`);
  };

  const renderListings = function(listings) {
    $("#searched-listings").empty();
    $.each(listings, function(index) {
      $("#searched-listings").prepend(createListingElement(listings[index]));
    });
  };

  $("#search-listings-form").submit(function(event) {
    event.preventDefault();
    parameters = $(this).serialize();
    $.ajax("/search", {type: "POST", data: parameters})
      .then((listings)=>{
        renderListings(listings);

      })
      .catch((err)=>console.log(err));
  });
});

