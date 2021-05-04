$(() => {
  $(document).on('click','.mark_as_sold',function(event) {
    event.preventDefault();
    const id = $(this).data("id");


    console.log('mark as sold listingid:',id);
    $.ajax(`/listings/${id}/mark_as_sold`, {type: "POST"})
      .catch((err)=>console.log(err));
  });
});