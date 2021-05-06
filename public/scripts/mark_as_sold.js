$(() => {
  $(document).on('click','.mark_as_sold',function(event) {
    event.preventDefault();
    const button = this;
    const id = $(button).data("id");

    const setDisplay = function(isSold, id) {
      if (isSold) {
        $(`#sold-${id}`).css("display","flex");
        $(button).find("button").html("Mark as Available");
      } else {
        $(`#sold-${id}`).css("display","none");
        $(button).find("button").html("Mark as Sold");
      }
    };



    console.log('mark as sold listingid:',id);
    $.ajax(`/listings/${id}/mark_as_sold`, {type: "POST"})
      .then((isSold)=>{
        if (isSold) {
          setDisplay(isSold, id);
          $('.toast-body').text('Marked as SOLD!');
        } else {
          setDisplay(isSold, id);
          $('.toast-body').text('Marked as Available!');

        }
        $('.toast').toast('show');
      })
      .catch((err) => console.log(err));
  });
});
