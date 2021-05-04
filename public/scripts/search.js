$(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createListingElement = function(listing) {
    return $(
      `<a href="/listings/${listing.id}">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src='${escape(listing.image_url)}' alt="Dog pic">
          <div class="card-body">
            <h5 class="item-title">
              ${escape(listing.title)}
            </h5>
            <h6 class="item-price">${escape(listing.price / 100)}
            </h6>
            <p class="item-description">
              ${escape(listing.description)}
            </p>
            <a href="#" class="btn btn-secondary">Learn More</a>
            <a class='fav' data-id=${listing.id}><i class="fas fa-star"></i></a>
          </div>
        </div>
      </a>`);
  }

  const renderListings = function(listings) {
    $("#searched_listings").empty();
    $.each(listings, function(index){
      $("#searched_listings").prepend(createListingElement(listings[index]));
    })
  }

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

