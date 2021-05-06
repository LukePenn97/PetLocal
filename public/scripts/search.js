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
        </div>

        <div class="card-bottom">
        <div id='view-listing-${listing.id}'>
          <a href="/listings/${listing.id}" class="view_listing">
            <button type="button" class="btn btn-secondary">View Listing</button>
          </a>
        </div>
        <button id='sold-${listing.id}' type="button" class="btn btn-danger sold"  disabled data-bs-toggle="button" autocomplete="off">SOLD</button>
        <a class="fav" data-id="${listing.id}">
          <i class="fas fa-heart" id="${listing.id}"></i>
        </a>
      </div>

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
        $.ajax(`/favourites/is_fav`, {type: "GET"})
          .then((rows) => {
            for (const fav of rows) {
              console.log("fav.listing_id:",fav.listing_id);
              $(`#${fav.listing_id}`).css("color","#c81d25");
            }
          })
          .catch((err)=>console.log(err));
      })
      .catch((err)=>console.log(err));

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
});

