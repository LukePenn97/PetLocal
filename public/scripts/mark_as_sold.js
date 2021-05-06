$(() => {
  $(document).on('click','.mark_as_sold',function(event) {
    event.preventDefault();
    const id = $(this).data("id");

    const setDisplay = function(isSold,id) {
      if (isSold) {
        $(`#sold-${id}`).css("display","flex");
      } else {
        $(`#sold-${id}`).css("display","none");
      }
    };


    
    console.log('mark as sold listingid:',id);
    $.ajax(`/listings/${id}/mark_as_sold`, {type: "POST"})
      .then((isSold)=>{
        if (isSold) {
          setDisplay(isSold, id);
          $('.toast-body').text('Marked as sold!');
        } else {
          $('.toast-body').text('Unmarked as sold!');
          
        }
        $('.toast').toast('show');
      })
      .catch((err) => console.log(err));
  });
});
