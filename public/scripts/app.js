$(() => {
  $.ajax({
    type: "GET",
    url: "/listings/"
  }).then((listings) => {
    for (const listing of listings) {
      $('#listings').prepend($(`<div class="card" style="width: 18rem;">
      <a href="/listings/${listing.id}">
      <img src="${listing.image_url}" class="card-img-top">
      <div class="card-body">
        <h5 class="item-title">
          ${listing.title}
        </h5>
        <h6 class="item-price">
          ${listing.price / 100}
        </h6>
        <p class="item-description">
          ${listing.description}
        </p>
        <i class="fas fa-star"></i>
      </div>
      </a>
    </div>`));
    }
  });
});
