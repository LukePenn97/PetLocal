$(() => {
  $(document).on('click','.fav',function(event) {
    event.preventDefault();
    const id = $(this).data("id");


    console.log('fav button with listingid:',id);
    $.ajax(`/favourites/${id}`, {type: "POST"})
      .catch((err)=>console.log(err));
  });
});