
$(() => {
  console.log('in app.js');

  $.ajax({
    type: "GET",
    url: "/api/users"
  }).then((users) => {
    
  });
  
  $.ajax({
    type: "GET",
    url: "/api/listings/"
  }).then((listings) => {
    for (const listing of listings) {
      $('#listings').prepend($(`<article class='listing'>
          <span>
            <div class='image'><img src=${listing.image_url} alt="Dog pic" width="200" height="200"></div>
            <p class='title'>${listing.title}</p>
            <p class='description'>${listing.description}</p>
          </span>
        </article>`));
    }
  });
  
});

